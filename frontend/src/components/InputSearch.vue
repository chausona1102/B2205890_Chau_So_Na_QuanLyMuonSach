<template>
    <div class="search-wrapper">
        <div class="search-box">
            <input type="text" class="search-input" placeholder="Tìm sách theo tên hoặc tác giả..." :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" @keyup.enter="$emit('submit')" />

            <button class="search-btn" @click="$emit('submit')">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        modelValue: String,
    },
    emits: ["update:modelValue", "submit"],
};
</script>
