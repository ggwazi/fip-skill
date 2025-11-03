#!/usr/bin/env node

/**
 * FIP Treatment Tracker
 *
 * Track patient progress during GS-441524 treatment
 * Monitor key parameters and generate progress reports
 */

/**
 * Treatment data point
 * @typedef {Object} DataPoint
 * @property {string} date - ISO date string
 * @property {number} weight - Weight in kg
 * @property {number} temperature - Temperature in Celsius
 * @property {Object} bloodwork - Blood test results
 * @property {string} clinicalSigns - Clinical observations
 */

export class TreatmentTracker {
  constructor(patientInfo = {}) {
    this.patientInfo = {
      name: patientInfo.name || 'Unknown',
      age_months: patientInfo.age_months || null,
      sex: patientInfo.sex || 'Unknown',
      disease_form: patientInfo.disease_form || 'Unknown',
      start_date: patientInfo.start_date || new Date().toISOString().split('T')[0]
    };

    this.dataPoints = [];
    this.baseline = null;
  }

  /**
   * Set baseline measurements
   */
  setBaseline(data) {
    this.baseline = {
      date: data.date || this.patientInfo.start_date,
      weight: data.weight,
      temperature: data.temperature,
      bloodwork: data.bloodwork || {}
    };
  }

  /**
   * Add a data point
   */
  addDataPoint(data) {
    const dataPoint = {
      date: data.date,
      day: this.calculateDay(data.date),
      weight: data.weight,
      temperature: data.temperature || null,
      bloodwork: data.bloodwork || null,
      clinicalSigns: data.clinicalSigns || '',
      dose_mg: data.dose_mg || null
    };

    this.dataPoints.push(dataPoint);
    return dataPoint;
  }

  /**
   * Calculate treatment day from date
   */
  calculateDay(date) {
    const startDate = new Date(this.patientInfo.start_date);
    const currentDate = new Date(date);
    const diffTime = currentDate - startDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * Calculate weight trend
   */
  getWeightTrend() {
    if (this.dataPoints.length < 2) {
      return null;
    }

    const weights = this.dataPoints.map(dp => ({ day: dp.day, weight: dp.weight }));
    const firstWeight = weights[0].weight;
    const lastWeight = weights[weights.length - 1].weight;

    const weightChange = lastWeight - firstWeight;
    const percentChange = (weightChange / firstWeight) * 100;

    return {
      start_weight: firstWeight,
      current_weight: lastWeight,
      change_kg: Math.round(weightChange * 1000) / 1000,
      change_percent: Math.round(percentChange * 10) / 10,
      trend: weightChange > 0 ? 'increasing' : weightChange < 0 ? 'decreasing' : 'stable'
    };
  }

  /**
   * Analyze A:G ratio trend
   */
  getAGRatioTrend() {
    const ratios = this.dataPoints
      .filter(dp => dp.bloodwork && dp.bloodwork.albumin && dp.bloodwork.globulin)
      .map(dp => ({
        day: dp.day,
        ratio: dp.bloodwork.albumin / dp.bloodwork.globulin
      }));

    if (ratios.length < 2) {
      return null;
    }

    const firstRatio = ratios[0].ratio;
    const lastRatio = ratios[ratios.length - 1].ratio;

    return {
      start_ratio: Math.round(firstRatio * 100) / 100,
      current_ratio: Math.round(lastRatio * 100) / 100,
      change: Math.round((lastRatio - firstRatio) * 100) / 100,
      trend: lastRatio > firstRatio ? 'improving' : lastRatio < firstRatio ? 'worsening' : 'stable',
      target_met: lastRatio >= 0.4
    };
  }

  /**
   * Check for fever (temperature > 39.2°C)
   */
  getFeverStatus() {
    const recentTemps = this.dataPoints
      .filter(dp => dp.temperature !== null)
      .slice(-7); // Last 7 measurements

    if (recentTemps.length === 0) {
      return null;
    }

    const avgTemp = recentTemps.reduce((sum, dp) => sum + dp.temperature, 0) / recentTemps.length;
    const hasFever = avgTemp > 39.2;
    const maxTemp = Math.max(...recentTemps.map(dp => dp.temperature));

    return {
      average_temp: Math.round(avgTemp * 10) / 10,
      max_temp: Math.round(maxTemp * 10) / 10,
      has_fever: hasFever,
      measurements: recentTemps.length
    };
  }

  /**
   * Generate treatment summary
   */
  getSummary() {
    if (this.dataPoints.length === 0) {
      return { error: 'No data points recorded' };
    }

    const latestData = this.dataPoints[this.dataPoints.length - 1];
    const treatmentDays = latestData.day;
    const treatmentWeeks = Math.floor(treatmentDays / 7);

    return {
      patient: this.patientInfo,
      treatment_duration: {
        days: treatmentDays,
        weeks: treatmentWeeks,
        target_days: 84
      },
      current_status: {
        date: latestData.date,
        weight: latestData.weight,
        temperature: latestData.temperature,
        clinical_signs: latestData.clinicalSigns
      },
      trends: {
        weight: this.getWeightTrend(),
        ag_ratio: this.getAGRatioTrend(),
        fever: this.getFeverStatus()
      },
      data_points_recorded: this.dataPoints.length
    };
  }

  /**
   * Generate progress report
   */
  generateReport() {
    const summary = this.getSummary();

    let report = `
FIP Treatment Progress Report
${='='.repeat(50)}

Patient: ${summary.patient.name}
Age: ${summary.patient.age_months} months
Disease Form: ${summary.patient.disease_form}
Treatment Started: ${summary.patient.start_date}

Treatment Duration: Day ${summary.treatment_duration.days} (Week ${summary.treatment_duration.weeks})
Target: ${summary.treatment_duration.target_days} days

Current Status (${summary.current_status.date}):
- Weight: ${summary.current_status.weight} kg
- Temperature: ${summary.current_status.temperature}°C
- Clinical Signs: ${summary.current_status.clinical_signs || 'None recorded'}

`;

    // Weight trend
    if (summary.trends.weight) {
      const wt = summary.trends.weight;
      report += `Weight Trend:
- Start: ${wt.start_weight} kg
- Current: ${wt.current_weight} kg
- Change: ${wt.change_kg > 0 ? '+' : ''}${wt.change_kg} kg (${wt.change_percent > 0 ? '+' : ''}${wt.change_percent}%)
- Trend: ${wt.trend.toUpperCase()}
`;
    }

    // A:G ratio trend
    if (summary.trends.ag_ratio) {
      const ag = summary.trends.ag_ratio;
      report += `
A:G Ratio Trend:
- Start: ${ag.start_ratio}
- Current: ${ag.current_ratio}
- Change: ${ag.change > 0 ? '+' : ''}${ag.change}
- Trend: ${ag.trend.toUpperCase()}
- Target (>0.4): ${ag.target_met ? 'MET ✓' : 'NOT MET'}
`;
    }

    // Fever status
    if (summary.trends.fever) {
      const fever = summary.trends.fever;
      report += `
Fever Status (recent):
- Average Temperature: ${fever.average_temp}°C
- Maximum: ${fever.max_temp}°C
- Status: ${fever.has_fever ? 'FEVER PRESENT ⚠️' : 'NO FEVER ✓'}
`;
    }

    report += `
${='='.repeat(50)}
Data Points Recorded: ${summary.data_points_recorded}
`;

    return report;
  }

  /**
   * Export data as CSV
   */
  exportCSV() {
    const headers = ['Date', 'Day', 'Weight (kg)', 'Temperature (°C)', 'Albumin', 'Globulin', 'A:G Ratio', 'Clinical Signs'];
    let csv = headers.join(',') + '\n';

    for (const dp of this.dataPoints) {
      const row = [
        dp.date,
        dp.day,
        dp.weight,
        dp.temperature || '',
        dp.bloodwork?.albumin || '',
        dp.bloodwork?.globulin || '',
        dp.bloodwork?.albumin && dp.bloodwork?.globulin ? (dp.bloodwork.albumin / dp.bloodwork.globulin).toFixed(2) : '',
        `"${dp.clinicalSigns || ''}"`
      ];
      csv += row.join(',') + '\n';
    }

    return csv;
  }
}

export default TreatmentTracker;
