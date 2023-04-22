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
                                v-model="newPost.title"
                                label="Tiêu đề"
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                    >
                        <v-select
                                v-model="tagSelected"
                                :items="listTag"
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
                                v-model="thumbnailImg"
                        />
                    </v-col>
                    <v-col
                            cols="6"
                    >
                        <v-switch
                                v-model="newPost.status"
                                flat
                                :label="`Hiện bài viết: ${newPost.status.toString()}`"
                        ></v-switch>
                    </v-col>
                    <v-col
                            cols="12"
                    >
                        <vue-editor v-model="newPost.content"/>
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
                    @click="createPost"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import {VueEditor} from "vue2-editor";
import axios from "axios";
import {CREATE_POST, GET_LIST_TAG} from "@/utils";

export default {
    name: "PostManager",
    components: {
        VueEditor,
    },
    data() {
        return {
            listTag: [],
            items: ['foo', 'bar', 'fizz', 'buzz'],
            tagSelected: [],
            switch1: true,
            content: '',
            thumbnailImg: '',
            rules: [
                value => !value || value.size < 20000000 || 'Image size should be less than 20 MB!',
            ],
            newPost: {
                status: true,
            },
        }
    },
    created() {
        this.getListTag();
    },
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Tạo bài viết' : 'Sửa bài viết'
        },
    },
    methods: {
        close() {
            this.$router.go(-1);
        },
        async getListTag() {
            try {
                const response = await axios.get(GET_LIST_TAG);
                response.data.forEach(e => {

                    let item = {
                        text: e.keyName,
                        value: e.value
                    }
                    this.listTag.push(item)
                })
            } catch (error) {
                console.log(error)
            }
        },
        async createPost() {
            this.convertFileToString();
            console.log(this.newPost);
            try {

                const instance = axios.create({
                    baseURL: CREATE_POST,
                });

                instance.interceptors.request.use(config => {
                        const token = sessionStorage.getItem('access_token');
                        if (token) {
                            config.headers['Authorization'] = `Bearer ${token}`;
                        }
                        return config;
                    }
                    , error => {
                        return Promise.reject(error);
                    });

                const respone = instance.post(CREATE_POST, {data: {}})

                console.log(respone)

            } catch (error) {
                console.log(error)
            }
        },
        convertFileToString() {
            let reader = new FileReader();
            reader.onload = (event) => {
                this.newPost.thumbnailImg = event.target.result;
            };
            reader.readAsDataURL(this.thumbnailImg);
        },
    }
}
</script>

<style scoped>

</style>