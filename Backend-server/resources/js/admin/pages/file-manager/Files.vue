<script setup>
import { onMounted } from "vue";
import { Bootstrap4Pagination } from "laravel-vue-pagination";
import FileItem from "../../../common/components/FileItem.vue";
import { useFileManager } from "@/admin/stores";
const fileManger = useFileManager();

onMounted(() => {
    fetchUploadedFiles();
});

const fetchUploadedFiles = async (page = 1) => {
    try {
        await fileManger.fetchFiles(page);
    } catch (error) {}
};
</script>

<template>
    <div class="text-right mb-2">
        <RouterLink :to="{ name: 'file.upload' }" class="btn btn-secondary"
            >Upload New File
        </RouterLink>
    </div>
    <div
        class="text-center text-muted"
        v-if="!fileManger.getItems?.data?.length"
    >
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <FileItem
        v-for="(file, index) in fileManger.getItems?.data"
        :key="index"
        :data="file"
    />
    <div>
        <Bootstrap4Pagination
            :data="fileManger.getItems"
            @pagination-change-page="fetchUploadedFiles"
        />
    </div>
</template>

<style>
.content-header {
    padding: 5px .5rem;
}

</style>
