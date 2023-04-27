<template>
    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>

        <v-data-table
                :headers="headerLog"
                :items="listLog"
                class="elevation-1"
                :items-per-page.sync="pageSize"
                :page.sync="page"
                :server-items-length.sync="totalItem"
                :footer-props="configPagination"
        >
            <template v-slot:top>
                <v-toolbar
                        flat
                >
                    <v-toolbar-title>Danh sách bài viết</v-toolbar-title>
                </v-toolbar>
            </template>
            <template v-slot:item.id="{ index }">
                {{ index + 1 }}
            </template>
        </v-data-table>
    </div>
</template>

<script>
import {apiGetAuthen} from "@/utils/api";
import {GET_LIST_LOG} from "@/utils";

export default {
    name: "ViewLog",
    data() {
        return {
            loading: false,
            headerLog: [
                {
                    text: 'STT',
                    align: 'start',
                    value: 'id',
                    width: 100
                },
                {
                    text: 'Nội dung',
                    value: 'value',
                },
                {text: 'Người tạo', value: 'createdBy', width: 120},
                {text: 'Ngày tạo', value: 'createdDate', width: 120},
            ],
            configPagination: {
                itemsPerPageOptions: [5, 10, 20, 50],
                itemsPerPageText: 'Số dòng',
                pageText: '$vuetify.dataFooter.pageText',
            },
            listLog: [],
            totalItem: 0,
            pageSize: 5,
            page: 1,


        }
    },
    created() {
        this.getAllLog();
    },
    watch: {
        pageSize() {
            this.getAllLog();
            console.log(this.pageSize)
        },
        page() {
            this.getAllLog();
        },
    },
    computed: {},
    methods: {
        async getAllLog() {
            try {
                this.loading = true;
                const url = GET_LIST_LOG + "?page=" + this.page + "&pageSize=" + this.pageSize;
                const response = await apiGetAuthen(url);

                this.listLog = response.data.content;
                this.listLog.map(e => {
                    e.createdDate = this.convertArrayDate2Date(e.createdDate)
                })
                this.totalItem = response.data.totalElements;
                console.log(response.data)
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