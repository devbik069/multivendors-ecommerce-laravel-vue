import { defineStore } from "pinia";
import axiosInstance from "@/admin/services/axiosServices";

export const useFileManager = defineStore("file-manager", {
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

        async fetchFiles(page) {
            try {
                const res = await axiosInstance.get(
                    `/admin/file-manager/files?page=${page}`
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

        async removeFile(id) {
            try {
                const res = await axiosInstance.delete(
                    `/admin/file-manager/${id}`
                );
                if (res.status === 200) {
                    console.log(res);
                    await this.fetchFiles(1);
                }
            } catch (error) {
                if (error.response.data) {
                    throw error.response.data.errors;
                }
            }
        },
    },
});
