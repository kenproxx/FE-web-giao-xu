<template>
    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>
        <v-card>
            <v-card-title>
                <span class="text-h5">Sửa bài viết</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                        >
                            <v-text-field
                                v-model="postEdit.title"
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
                                v-model="postEdit.status"
                                flat
                                :label="`Hiện bài viết: ${postEdit.status.toString()}`"
                            ></v-switch>
                        </v-col>
                        <v-col
                            cols="12"
                        >
                            <vue-editor v-model="postEdit.content"/>
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
                    @click="savePost"
                >
                    Lưu
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>

</template>

<script>
import {VueEditor} from "vue2-editor";
import axios from "axios";
import {CREATE_POST, EDIT_POST, FIND_BY_ID, GET_LIST_TAG} from "@/utils";
import {apiPutAuthen} from "@/utils/api";

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
            loading: false,
            content: '',
            thumbnailImg: '',
            rules: [
                value => !value || value.size < 20000000 || 'Image size should be less than 20 MB!',
            ],
            postEdit: {
                status: true,
            },
        }
    },
    created() {
        this.loading = true;
        this.getListTag();
        this.findPostById(this.$route.params.id)
    },
    methods: {
        close() {
            this.$router.go(-1);
        },
        async findPostById(id) {
            try {
                const response = await axios.get(FIND_BY_ID + id);
                this.postEdit = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
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
        async savePost() {
            try {
                this.loading = true;
                this.convertFileToString();
                await apiPutAuthen(EDIT_POST, this.postEdit);
                this.$router.go(-1);
            } catch (error){
                console.log(error)
            } finally {
                this.loading = false;
            }
        },
        convertFileToString() {
            let reader = new FileReader();
            reader.onload = (event) => {
                this.postEdit.thumbnailImg = event.target.result;
            };
            reader.readAsDataURL(this.thumbnailImg);
        },
    }
}
</script>

<style scoped>

</style>