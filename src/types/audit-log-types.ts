export interface AuditLogEntry {
    id: string;
    actorId: string;
    actorRole: string;
    action: string;
    targetEntityType: string;
    targetEntityId: string;
    reason?: string;
    metadata?: Record<string, unknown>;
    districtId?: string;
    createdAt: string;
}

export interface ListAuditLogsResponse {
    success: boolean;
    message: string;
    data?: AuditLogEntry[];
}
