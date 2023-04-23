<template>
    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>

    <v-card>
        <v-toolbar
                flat
                color="primary"
                dark
        >
            <v-toolbar-title>Admin</v-toolbar-title>
        </v-toolbar>
        <v-tabs vertical>
            <v-tab>
                <v-icon left>
                    mdi-account
                </v-icon>
                Quản lý bài viết
            </v-tab>
            <v-tab>
                <v-icon left>
                    mdi-lock
                </v-icon>
                Lịch sử thao tác
            </v-tab>

            <v-tab-item>
                <v-card flat>

                    <v-data-table
                        :headers="headerListPost"
                        :items="listPost"
                        sort-by="calories"
                        class="elevation-1"
                        @click:row="selectRow"
                    >

                        <template v-slot:top>
                            <v-toolbar
                                flat
                            >
                                <v-toolbar-title>Danh sách bài viết</v-toolbar-title>
                                <v-divider
                                    class="mx-4"
                                    inset
                                    vertical
                                ></v-divider>
                                <v-spacer></v-spacer>
                                <v-text-field
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-spacer></v-spacer>

                                        <v-btn
                                            color="primary"
                                            dark
                                            class="mb-2"
                                            :to="{name: 'CreatePost'}"
                                        >
                                            Tạo mới
                                        </v-btn>
<!--                                    <v-card>-->
<!--                                        <v-card-title>-->
<!--                                            <span class="text-h5">{{ formTitle }}</span>-->
<!--                                        </v-card-title>-->

<!--                                        <v-card-text>-->
<!--                                            <v-container>-->
<!--                                                <v-row>-->
<!--                                                    <v-col-->
<!--                                                        cols="12"-->
<!--                                                        sm="6"-->
<!--                                                        md="4"-->
<!--                                                    >-->
<!--                                                        <v-text-field-->
<!--                                                            v-model="editedItem.name"-->
<!--                                                            label="Dessert name"-->
<!--                                                        ></v-text-field>-->
<!--                                                    </v-col>-->
<!--                                                    <v-col-->
<!--                                                        cols="12"-->
<!--                                                        sm="6"-->
<!--                                                        md="4"-->
<!--                                                    >-->
<!--                                                        <v-text-field-->
<!--                                                            v-model="editedItem.calories"-->
<!--                                                            label="Calories"-->
<!--                                                        ></v-text-field>-->
<!--                                                    </v-col>-->
<!--                                                    <v-col-->
<!--                                                        cols="12"-->
<!--                                                        sm="6"-->
<!--                                                        md="4"-->
<!--                                                    >-->
<!--                                                        <v-text-field-->
<!--                                                            v-model="editedItem.fat"-->
<!--                                                            label="Fat (g)"-->
<!--                                                        ></v-text-field>-->
<!--                                                    </v-col>-->
<!--                                                    <v-col-->
<!--                                                        cols="12"-->
<!--                                                        sm="6"-->
<!--                                                        md="4"-->
<!--                                                    >-->
<!--                                                        <v-text-field-->
<!--                                                            v-model="editedItem.carbs"-->
<!--                                                            label="Carbs (g)"-->
<!--                                                        ></v-text-field>-->
<!--                                                    </v-col>-->
<!--                                                    <v-col-->
<!--                                                        cols="12"-->
<!--                                                        sm="6"-->
<!--                                                        md="4"-->
<!--                                                    >-->
<!--                                                        <v-text-field-->
<!--                                                            v-model="editedItem.protein"-->
<!--                                                            label="Protein (g)"-->
<!--                                                        ></v-text-field>-->
<!--                                                    </v-col>-->
<!--                                                </v-row>-->
<!--                                            </v-container>-->
<!--                                        </v-card-text>-->

<!--                                        <v-card-actions>-->
<!--                                            <v-spacer></v-spacer>-->
<!--                                            <v-btn-->
<!--                                                color="blue darken-1"-->
<!--                                                text-->
<!--                                                @click="close"-->
<!--                                            >-->
<!--                                                Hủy-->
<!--                                            </v-btn>-->
<!--                                            <v-btn-->
<!--                                                color="blue darken-1"-->
<!--                                                text-->
<!--                                                @click="save"-->
<!--                                            >-->
<!--                                                Lưu-->
<!--                                            </v-btn>-->
<!--                                        </v-card-actions>-->
<!--                                    </v-card>-->


                                <v-dialog v-model="dialogDelete" max-width="500px">
                                    <v-card>
                                        <v-card-title class="text-h5">Bạn có muốn ẩn bài viết này?</v-card-title>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn color="blue darken-1" text @click="closeDelete">Hủy</v-btn>
                                            <v-btn color="blue darken-1" text @click="deleteItemConfirm">Đồng ý</v-btn>
                                            <v-spacer></v-spacer>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-toolbar>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-icon
                                small
                                class="mr-2"
                                @click="editItem(item)"
                            >
                                mdi-pencil
                            </v-icon>
                            <v-icon
                                small
                                @click="deleteItem(item)"
                            >
                                mdi-delete
                            </v-icon>
                        </template>
                        <template v-slot:no-data>
                            <v-btn
                                color="primary"
                            >
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card>
            </v-tab-item>


            <v-tab-item>
                <v-card flat>
<!--                    <v-card flat>-->
<!--                        <v-data-table-->
<!--                                :headers="headers"-->
<!--                                :items="desserts"-->
<!--                                :items-per-page="5"-->
<!--                                class="elevation-1"-->
<!--                        ></v-data-table>-->
<!--                    </v-card>-->
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-card>
    </div>
</template>

<script>
import PostManager from "@/views/post-manager/CreatePost.vue";
import {CHANGE_STATUS_POST, GET_ALL_POST} from "@/utils";
import {apiGetAuthen, apiPutAuthen} from "@/utils/api";

export default {
    components: {PostManager},
    data() {
        return {
            // headers: [
            //     {
            //         text: 'Dessert (100g serving)',
            //         align: 'start',
            //         sortable: false,
            //         value: 'name',
            //     },
            //     {text: 'Calories', value: 'calories'},
            //     {text: 'Fat (g)', value: 'fat'},
            //     {text: 'Carbs (g)', value: 'carbs'},
            //     {text: 'Protein (g)', value: 'protein'},
            //     {text: 'Iron (%)', value: 'iron'},
            // ],
            // desserts: [
            //     {
            //         name: 'Frozen Yogurt',
            //         calories: 159,
            //         fat: 6.0,
            //         carbs: 24,
            //         protein: 4.0,
            //         iron: 1,
            //     },
            //     {
            //         name: 'Ice cream sandwich',
            //         calories: 237,
            //         fat: 9.0,
            //         carbs: 37,
            //         protein: 4.3,
            //         iron: 1,
            //     },
            //     {
            //         name: 'Eclair',
            //         calories: 262,
            //         fat: 16.0,
            //         carbs: 23,
            //         protein: 6.0,
            //         iron: 7,
            //     },
            //     {
            //         name: 'Cupcake',
            //         calories: 305,
            //         fat: 3.7,
            //         carbs: 67,
            //         protein: 4.3,
            //         iron: 8,
            //     },
            //     {
            //         name: 'Gingerbread',
            //         calories: 356,
            //         fat: 16.0,
            //         carbs: 49,
            //         protein: 3.9,
            //         iron: 16,
            //     },
            //     {
            //         name: 'Jelly bean',
            //         calories: 375,
            //         fat: 0.0,
            //         carbs: 94,
            //         protein: 0.0,
            //         iron: 0,
            //     },
            //     {
            //         name: 'Lollipop',
            //         calories: 392,
            //         fat: 0.2,
            //         carbs: 98,
            //         protein: 0,
            //         iron: 2,
            //     },
            //     {
            //         name: 'Honeycomb',
            //         calories: 408,
            //         fat: 3.2,
            //         carbs: 87,
            //         protein: 6.5,
            //         iron: 45,
            //     },
            //     {
            //         name: 'Donut',
            //         calories: 452,
            //         fat: 25.0,
            //         carbs: 51,
            //         protein: 4.9,
            //         iron: 22,
            //     },
            //     {
            //         name: 'KitKat',
            //         calories: 518,
            //         fat: 26.0,
            //         carbs: 65,
            //         protein: 7,
            //         iron: 6,
            //     },
            // ],
            dialog: false,
            loading: false,
            dialogDelete: false,
            headerListPost: [
                {
                    text: 'Tiêu đề',
                    align: 'start',
                    value: 'title',
                },
                { text: 'Người tạo', value: 'createdBy' },
                { text: 'Ngày tạo', value: 'createdDate' },
                { text: 'Người cập nhật', value: 'updatedBy' },
                { text: 'Ngày cập nhật', value: 'updatedDate' },
                { text: 'Trạng thái', value: 'status' },
                { text: 'Thao tác', value: 'actions', sortable: false },
            ],
            desserts: [],
            editedIndex: -1,
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            defaultItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
            listPost: [],
            idCurrentRowNow: '',


        }
    },
    watch: {
        dialog (val) {
            val || this.close()
        },
        dialogDelete (val) {
            val || this.closeDelete()
        },
    },
    created () {
        this.loading = true;
        this.getAllPost();
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tạo bài viết' : 'Sửa bài viết'
        },
    },

    methods: {

        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        async deleteItemConfirm() {
            try {
                this.dialogDelete = false
                this.loading = true;
                await apiPutAuthen(CHANGE_STATUS_POST + this.idCurrentRowNow);
                this.getAllPost();
            } catch (error) {
                console.error(error);
            }
        },

        selectRow(item) {
            this.idCurrentRowNow = item.id;
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
                this.desserts.push(this.editedItem)
            }
            this.close()
        },
        async getAllPost() {
            try {
                this.loading = true;
                const response = await apiGetAuthen(GET_ALL_POST);
                response.data.map( e => {
                    e.createdDate = this.convertArrayDate2Date(e.createdDate)
                    e.updatedDate = this.convertArrayDate2Date(e.updatedDate)
                })
                this.listPost = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        convertArrayDate2Date(dateArray) {
            if (dateArray !== null) {
                const dateObj = new Date(...dateArray);
                return dateObj.toLocaleDateString('en-GB');
            }
            return null;
        },
    },
}
</script>

<style scoped>

</style>