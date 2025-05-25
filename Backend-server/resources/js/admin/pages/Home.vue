<template>
    <div>
        <button class="btn btn-primary" @click.prevent="openModal">Open Modal</button>
        <ModalBasic>
            <template #title>
                Dynamic title
            </template>
            <form>

                <div class="modal-body">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" name="name" id="name" placeholder="your name">
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Save</button>
                </div>
            </form>
        </ModalBasic>
    </div>
</template>
<script setup>
import ModalBasic from "@/common/components/Modal/Basic.vue";
const openModal = () => {
    $('#mymodal').modal('show');
}
</script>
