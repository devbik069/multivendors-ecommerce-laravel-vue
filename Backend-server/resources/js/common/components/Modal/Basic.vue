<script setup>
const closeModal = () => {
    $("#mymodal").modal("hide");
};
</script>

<template>
    <div
        class="modal fade"
        id="mymodal"
        data-backdrop="static"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-xl modal-center" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                        <span>
                            <slot name="title" />
                        </span>
                    </h5>
                    <button
                        type="button"
                        class="close"
                        aria-label="Close"
                        @click.prevent="closeModal"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
