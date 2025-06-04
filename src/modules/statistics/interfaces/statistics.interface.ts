/**
 * Core statistics data structure
 */
export interface IStatistics {
  totalUniversities: number;
  verifiedCertificates: number;
  failedVerifications: number;
  revokedCertificates: number;
  lastUpdated: string;
}

/**
 * Repository contract for statistics data access
 */
export interface IStatisticsRepository {
  getTotalUniversities(): Promise<number>;
  getVerifiedCertificatesCount(): Promise<number>;
  getFailedVerificationsCount(): Promise<number>;
  getRevokedCertificatesCount(): Promise<number>;
}

/**
 * Service layer contract for statistics operations
 */
export interface IStatisticsService {
  getAggregatedStatistics(): Promise<IStatistics>;
}