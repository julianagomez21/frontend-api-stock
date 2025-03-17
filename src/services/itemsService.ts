import axios from "axios";
import type { Item } from "../model/item.models";

const API_URL = "http://localhost:8080";

export const fetchItemsService = (search: string, limit: number, offset: number): Promise<Item[]> => {
    return axios.get(`${API_URL}/items`, { params: { search, limit, offset } })
        .then(response => {
            if (response.data?.items) {
                return response.data.items.map((item: any) => ({
                    ticker: item.ticker,
                    target_from: parseFloat(item.Target_From),
                    target_to: parseFloat(item.Target_To),
                    company: item.Company,
                    brokerage: item.Brokerage,
                    change: ((parseFloat(item.Target_To) - parseFloat(item.Target_From)) / parseFloat(item.Target_From)) * 100,
                    rating_from: item.Rating_From,
                    rating_to: item.Rating_To,
                    action: item.Action,
                }));
            } 
            return [];
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
            return [];
        });
};

export const fetchBestRecommendation = (): Promise<Item[]> => {
    return axios.get(`${API_URL}/recommendation`).then(response => {
        if (response.data?.recommendations) {
            return response.data.recommendations.map((recommendation: any) => ({
                ticker: recommendation.ticker,
                target_from: parseFloat(recommendation.target_from),
                target_to: parseFloat(recommendation.target_to),
                company: recommendation.company,
                brokerage: recommendation.brokerage,
                change: ((parseFloat(recommendation.target_to) - parseFloat(recommendation.target_from)) / parseFloat(recommendation.target_from)) * 100,
                rating_from: recommendation.rating_from,
                rating_to: recommendation.rating_to,
                action: recommendation.action,
            }));
        }
        return [];
    }).catch(error => {
        console.error("Error al obtener los datos:", error);
        return [];
    });
};