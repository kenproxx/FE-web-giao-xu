<template>
    <div>
        <vue-editor v-model="content"/>
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
        };
    },
    methods:{
    }
};
</script>
