// src\lib\api.ts
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface Case {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: "open" | "closed";
}

export const casesApi = {
  getAllCases: async (): Promise<Case[]> => {
    // For now, return dummy data
    return [
      {
        id: "case-001",
        title: "Missing Person - John Doe",
        description: "Last seen at Central Station",
        createdAt: new Date("2024-02-28T10:00:00Z"),
        status: "open",
      },
      {
        id: "case-002",
        title: "Vehicle Theft - Blue Toyota",
        description: "Stolen from Main Street parking",
        createdAt: new Date("2024-02-27T15:30:00Z"),
        status: "open",
      },
      {
        id: "case-003",
        title: "Vandalism Report",
        description: "Graffiti incident at City Park",
        createdAt: new Date("2024-02-26T09:15:00Z"),
        status: "closed",
      },
    ];

    // When backend is ready, use this:
    // const response = await api.get('/cases');
    // return response.data;
  },

  searchCases: async (query: string): Promise<Case[]> => {
    // For now, filter dummy data
    const allCases = await casesApi.getAllCases();
    const lowercaseQuery = query.toLowerCase();

    return allCases.filter(
      (case_) =>
        case_.id.toLowerCase().includes(lowercaseQuery) ||
        case_.title.toLowerCase().includes(lowercaseQuery)
    );

    // When backend is ready, use this:
    // const response = await api.get(`/cases/search?q=${encodeURIComponent(query)}`);
    // return response.data;
  },

  createCase: async (
    caseData: Omit<Case, "id" | "createdAt">
  ): Promise<Case> => {
    // For now, return dummy data
    return {
      ...caseData,
      id: `case-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };

    // When backend is ready, use this:
    // const response = await api.post('/cases', caseData);
    // return response.data;
  },
};
