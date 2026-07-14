import api from '@/config/api';
import { apiRoutes } from '@/config/apiRoutes';
import type { PaginatedHistoryLogs } from '../models/history.model';

export const HistoryService = {
  findAll: async (params?: {
    page?: number;
    limit?: number;
    action?: string;
  }): Promise<PaginatedHistoryLogs> => {
    const response = await api.get<PaginatedHistoryLogs>(
      `${apiRoutes.HISTORY.GET_ALL(params)}`,
    );
    return response.data;
  },
};
