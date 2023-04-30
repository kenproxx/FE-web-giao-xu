<template>
    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>
        <v-card>
            <v-card-title>
                <span class="text-h5">Tạo bài viết</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-form
                                ref="form"
                                v-model="validForm"
                                lazy-validation
                        >
                            <v-col
                                    cols="12"
                            >
                                <v-text-field
                                        v-model="newPost.title"
                                        label="Tiêu đề" required
                                        :rules="rulesRequired"
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
                                        multiple required
                                        :rules="rulesRequired"

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
                                        :show-size="true" required
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
                                <vue-editor v-model="newPost.content"
                                            :rules="rulesRequired"
                                            required/>
                            </v-col>
                        </v-form>
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
        <v-snackbar
                v-model="isAlert"
                right
                top
                :color="colorAlert"
                :timeout="timeout"
        >
            {{ messageAlert }}
        </v-snackbar>
    </div>

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
            tagSelected: [],
            switch1: true,
            validForm: true,
            loading: false,
            content: '',
            colorAlert: '',
            isAlert: false,
            timeout: 1000,
            messageAlert: '',
            thumbnailImg: '',
            rules: [
                value => !value || value.size < 20000000 || 'Image size should be less than 20 MB!',
                v => !!v || 'Trường này là bắt buộc',
            ],
            rulesRequired: [
                v => !!v || 'Trường này là bắt buộc',
            ],

            newPost: {
                status: true,
            },
        }
    },
    created() {
        this.getListTag();
    },
    methods: {
        validate() {
            this.$refs.form.validate()
        },
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
            try {
                this.validate();
                this.convertFileToString();
                this.loading = true;
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

                await instance.post(CREATE_POST, this.newPost)

                this.messageAlert = 'Tạo bài viết thành công';
                this.colorAlert = 'green';
                this.isAlert = true;
                setTimeout(() => {
                    this.$router.go(-1);
                }, 1000);
            } catch (error) {
                console.log(error)
                this.messageAlert = 'Tạo bài viết thất bại, kiểm tra lại!';
                this.colorAlert = 'red';
                this.isAlert = true;
            } finally {
                this.loading = false;
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