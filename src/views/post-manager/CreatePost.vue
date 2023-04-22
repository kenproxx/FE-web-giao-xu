<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">Tạo bài viết</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col
                            cols="12"
                    >
                        <v-text-field
                                v-model="editedItem.name"
                                label="Tiêu đề"
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                    >
                        <v-select
                            v-model="value"
                            :items="items"
                            attach
                            chips
                            label="Thể loại"
                            multiple
                        ></v-select>
                    </v-col>
                    <v-col
                            cols="6"
                    >
                        <v-file-input
                            :rules="rules"
                            accept="image/png, image/jpeg, image/bmp"
                            placeholder="Chọn ảnh bìa"
                            prepend-icon="mdi-camera"
                            label="Ảnh bìa"
                            v-model="thumbnail"
                        />
                    </v-col>
                    <v-col
                            cols="6"
                    >
                        <v-switch
                            v-model="switch1"
                            flat
                            :label="`Switch 1: ${switch1.toString()}`"
                        ></v-switch>
                    </v-col>
                    <v-col
                            cols="12"
                    >
                        <vue-editor v-model="content"/>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="blue darken-1"
                    text
                    @click="close"

            >
                Hủy
            </v-btn>
            <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {VueEditor} from "vue2-editor";

export default {
    name: "PostManager",
    components: {
        VueEditor,
    },
    data() {
        return{
            items: ['foo', 'bar', 'fizz', 'buzz'],
            value: ['foo', 'bar', 'fizz', 'buzz'],
            switch1: true,
            content: '',
            avatar: '',
            rules: [
                value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
            ],
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }
    },
    created() {
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tạo bài viết' : 'Sửa bài viết'
        },
    },
    methods:{
        close() {
            this.$router.go(-1);
        },
    }
}
</script>

<style scoped>

</style>