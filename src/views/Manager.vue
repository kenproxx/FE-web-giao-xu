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
                        mdi-post
                    </v-icon>
                    Quản lý bài viết
                </v-tab>
                <v-tab>
                    <v-icon left>
                        mdi-history
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
                                :scroll-x="true"
                        >
                            <template v-slot:item.title="{ item }">
                                <div class="hidden-text">{{ item.title }}</div>
                            </template>
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
                                    <v-dialog v-model="dialogDelete" max-width="530px">
                                        <v-card>
                                            <v-card-title class="text-h5">Bạn có muốn thay đổi trạng thái bài viết này?</v-card-title>
                                            <v-card-actions>
                                                <v-spacer></v-spacer>
                                                <v-btn color="blue darken-1" text @click="closeDelete">Hủy</v-btn>
                                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">Đồng ý
                                                </v-btn>
                                                <v-spacer></v-spacer>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>
                                </v-toolbar>
                            </template>
                            <template v-slot:item.status="{ item }">
                                <div class="tag" :class="item.status ? 'green' : 'red' ">{{
                                    textStatus(item.status)
                                    }}
                                </div>
                            </template>

                            <template v-slot:item.status="{ item }">
                                <v-chip
                                    :color="getColor(item.status)"
                                    dark
                                >
                                    {{ textStatus(item.status) }}
                                </v-chip>
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-icon
                                        small
                                        class="mr-2"
                                        @click="editItem(item.id)"
                                >
                                    mdi-pencil
                                </v-icon>
                                <v-icon
                                        small
                                        @click="deleteItem(item)"
                                >
                                    mdi-swap-horizontal
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
                        <v-card flat>
                            <view-log/>
                        </v-card>
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
import ViewLog from "@/views/ViewLog.vue";

export default {
    components: {ViewLog, PostManager},
    data() {
        return {
            dialog: false,
            loading: false,
            dialogDelete: false,
            headerListPost: [
                {
                    text: 'Tiêu đề',
                    align: 'start',
                    value: 'title',
                },
                {text: 'Người tạo', value: 'createdBy', width: 120},
                {text: 'Ngày tạo', value: 'createdDate', width: 120},
                {text: 'Người cập nhật', value: 'updatedBy', width: 135},
                {text: 'Ngày cập nhật', value: 'updatedDate', width: 135},
                {text: 'Trạng thái', value: 'status', width: 140, align: 'center',},
                {text: 'Thao tác', value: 'actions', sortable: false, width: 95, align: 'center',},
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
            listPost: [],
            idCurrentRowNow: '',


        }
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.loading = true;
        this.getAllPost();
    },
    computed: {
    },

    methods: {

        editItem(id) {
            let link = '/edit-post/' + id;
            this.$router.push(link);
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
            this.idCurrentRowNow = item.id;
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


        close() {
            this.dialog = false
        },

        closeDelete() {
            this.dialogDelete = false
        },

        save() {
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
                response.data.map(e => {
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

        textStatus(status) {
            return status ? "Đang được hiện" : "Đang bị ẩn";
        },
        getColor (isStatus) {
            return !isStatus ? 'red' : 'green';
        },

    },
}
</script>

<style scoped>
.green {
    background-color: green;
}

.tag {
    color: white;
    font-weight: bold;
    font-size: 12px;
    padding: 5px 10px;
    border-radius: 10px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

.red {
    background-color: red;
}

.hidden-text {
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Số dòng tối đa trước khi nội dung bị ẩn */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>