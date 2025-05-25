import { defineStore } from "pinia";
import axiosInstance from "@/admin/services/axiosServices";
import { useBulkDelete } from "./bulk_delete";


export const useBrand = defineStore("brands", {
    state: () => ({
        items: [],
    }),

    getters: {
        getItems: (state) => {
            return state.items;
        },
    },

    actions: {
        async fiileUpload(formData) {
            try {
                const res = await axiosInstance.post(
                    "/admin/file-manager/upload",
                    formData
                );

                console.log(res);
                // if (res.status === 200) {
                //     this.setAuthInfo(res.data?.data);
                //     return res.data?.data;
                // }
            } catch (error) {
                if (error.response.data) {
                    throw error.response.data.errors;
                }
            }
        },

        async index(page, perPage, searchQuery) {
            try {
                const res = await axiosInstance.get(
                    "/admin/brands", {
                    params: {
                        page,
                        perPage,
                        search: searchQuery,
                    }
                }
                );
                if (res.status === 200) {
                    this.items = res.data;
                    return res.data?.data;
                }
            } catch (error) {
                if (error.response.data) {
                    throw error.response.data.errors;
                }
            }
        },

        async multipoleDelete(selectedIds) {
            try {
                const res = await axiosInstance.delete(
                    "/admin/brand/multiple-delete", {
                    params: {
                        ids: selectedIds
                    }
                }
                );

                if (res.status === 200) {
                    this.items.data = this.items.data.filter((data) => !selectedIds.includes(data?.id))
                }
                const bulkDelete = useBulkDelete();
                bulkDelete.$reset();

            } catch (error) {
                if (error.response.data) {
                    throw error.response.data.errors;
                }
            }
        },

        async destroy(Id) {
            try {
                const res = await axiosInstance.delete(`/admin/brands/${Id}`);
                if (res.status === 200) {
                    const index = this.items.data.findIndex(
                        (item) => item.id === Id
                    );
                    this.items.data.splice(index, 1);
                }
            } catch (error) {
                if (error.response.data) {
                    throw error.response.data.errors;
                }
            }
        },
    },
});
