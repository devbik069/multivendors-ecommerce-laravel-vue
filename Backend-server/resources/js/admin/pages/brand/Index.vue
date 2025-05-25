<script setup>
import { onMounted, ref, computed } from "vue";
import { debounce } from "lodash";
import { Bootstrap5Pagination } from "laravel-vue-pagination";
import { PrimaryButton, DeleteButton } from "@/common/components/Form";

import {
    Table,
    TableHead,
    TableRow,
    TableData,
} from "../../../common/components/table";

import { useBrand, useBulkDelete } from "@/admin/stores";
const brands = useBrand();
const bulkDelete = useBulkDelete();

onMounted(() => {
    brands.index();
});
const perPage = ref(10);
const searchQuery = ref("");
const debounceSearch = computed(() => debounce(getResults, 500));
const getResults = async (page = 1) => {
    brands.index(page, perPage.value, searchQuery.value);
};

//multipole delete brand

// const selectedData = ref([]);
// const selectAll = ref(false);
const slectAllData = async () => {
    await bulkDelete.selectAllData(brands.getItems?.data);
    // // if (selectAll.value) {
    // //     selectedData.value = brands.getItems?.data.map((data) => data.id);
    // // } else {
    // //     selectedData.value = [];
    // }
};

const toggleSelectSelection = async (data) => {
    await bulkDelete.toggleSelection(data);
    //     const index = selectedData.value.indexOf(data?.id);
    //     if (index === -1) {
    //         selectedData.value.push(data?.id);
    //     } else {
    //         selectedData.value.splice(index, 1);
    //     }
};

const multipleDeleteSubmit = async () => {
    await brands.multipoleDelete(bulkDelete.getSelected);
};

const singleDelete = async (id) => {
    if (confirm("are you shure to Delete ?")) {
        await brands.destroy(id);
    }
};
</script>

<template>
    <div>
        <section class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
                            <!-- <div class="card-header">
                                <h3 class="card-title">
                                    DataTable with minimal features & hover
                                    style
                                </h3>
                            </div> -->
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="d-flex justify-content-between">
                                    <div class="tb_search">
                                        <input
                                            type="text"
                                            placeholder="Search.."
                                            class="form-control"
                                            v-model="searchQuery"
                                            @input="debounceSearch"
                                        />
                                    </div>

                                    <div>
                                        <button
                                            class="btn btn-sm btn-danger"
                                            @click="multipleDeleteSubmit"
                                            v-if="
                                                bulkDelete.selectedData.length
                                            "
                                        >
                                            Delete ({{
                                                bulkDelete.selectedData.length
                                            }})
                                        </button>
                                    </div>

                                    <div class="num_rows">
                                        <div class="form-group">
                                            <select
                                                class="form-control"
                                                name="state"
                                                v-model="perPage"
                                                @change="getResults"
                                            >
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                                <option value="70">70</option>
                                                <option value="100">100</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <Table>
                                    <template #tableHead>
                                        <TableHead>
                                            <input
                                                type="checkbox"
                                                v-model="bulkDelete.selectAll"
                                                @change="slectAllData"
                                            />
                                        </TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Image</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Name</TableHead>
                                    </template>
                                    <TableRow
                                        v-for="(brand, index) in brands.getItems
                                            ?.data"
                                        :key="index"
                                    >
                                        <TableData>
                                            <input
                                                type="checkbox"
                                                :checked="bulkDelete.selectAll"
                                                @change="
                                                    toggleSelectSelection(brand)
                                                "
                                            />
                                        </TableData>
                                        <TableData>{{ brand.name }}</TableData>
                                        <TableData>
                                            <img
                                                :src="
                                                    $filters.makeImagePath(
                                                        brand.image
                                                    )
                                                "
                                                alt="image"
                                            />
                                        </TableData>
                                        <TableData class="text-capitalize">
                                            <!-- {{ brand.status }} -->
                                            <select class="form-control">
                                                <option value="active" :selected="brand.status == 'active'">Active</option>
                                                <option value="inactive" :selected="brand.status == 'inactive'">Inactive</option>
                                            </select>
                                        </TableData>
                                        <TableData>
                                            <div
                                                class="d-flex"
                                                style="gap: 4px"
                                            >
                                                <PrimaryButton
                                                    type="button"
                                                    title="Edit"
                                                >
                                                    <i class="fa fa-edit"></i>
                                                </PrimaryButton>

                                                <DeleteButton
                                                    type="button"
                                                    title="Delete"
                                                    @click="
                                                        singleDelete(brand?.id)
                                                    "
                                                >
                                                    <i class="fa fa-trash"></i>
                                                </DeleteButton>
                                            </div>
                                        </TableData>
                                    </TableRow>
                                </Table>

                                <Bootstrap5Pagination
                                    :data="brands.getItems"
                                    @pagination-change-page="getResults"
                                />
                            </div>
                            <!-- /.card-body -->
                        </div>
                        <!-- /.card -->
                    </div>
                    <!-- /.col -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
        </section>
    </div>
</template>
