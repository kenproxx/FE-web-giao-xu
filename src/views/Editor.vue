<template>
    <div>
        <vue-editor v-model="content"/>
        <v-file-input
            :rules="rules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Chọn ảnh bìa"
            prepend-icon="mdi-camera"
            label="Ảnh bìa"
            v-model="avatar"/>
    </div>
</template>

<script>
import { VueEditor  } from 'vue2-editor';

export default {
    name: 'MyComponent',
    components: {
        VueEditor,
    },
    data() {
        return {
            content: '',
            avatar: '',
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
        };
    },
    methods:{
        test() {
            let reader = new FileReader();
            reader.onload = (event) => {
                let base64String = event.target.result;
                console.log(base64String);
            };
            reader.readAsDataURL(this.avatar);
        },
    }
};
</script>
