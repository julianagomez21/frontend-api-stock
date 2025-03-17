import { defineStore } from 'pinia'
import type { Item } from '../model/item.models'
import { fetchBestRecommendation, fetchItemsService } from '../services/itemsService';

interface ItemStore {
    items: Item[],
    loading: boolean,
    limit: number,
    offset: number,
    search: string,
    recommendations: Item[] | null,
}

export const useItemsStore = defineStore('items', {
    state: (): ItemStore => ({
        items: [],
        loading: false,
        limit: 10,
        offset: 0,
        search: '',
        recommendations: null,
    }),
    getters: {},
    actions: {
        setItems(newItems: Item[]) {
            this.items = newItems;
        },

        async fetchItems() {
            this.loading = true;
            try {
                this.items = await fetchItemsService(this.search, this.limit, this.offset);
            } catch (error) {
                console.error("Error en fetchItems:", error);
            } finally {
                this.loading = false;
            }
        },

        prevPage() {
            if (this.offset >= this.limit) {
                this.offset -= this.limit;
                this.fetchItems();
            }
        },

        nextPage() {
            this.offset += this.limit;
            this.fetchItems();
        },

        async fetchRecommendation() {
            this.loading = true;
            try {
                this.recommendations = await fetchBestRecommendation();
            } catch (error) {
                console.error("Error en fetchRecommendation:", error);
            } finally {
                this.loading = false;
            }
        }
    }
})