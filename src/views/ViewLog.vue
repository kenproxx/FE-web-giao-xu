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
                {text: 'Người thao tác', value: 'createdBy', width: 120},
                {text: 'Giờ thao tác', value: 'createdDate', width: 120},
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
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        convertArrayDate2Date(dateArray) {
            if (dateArray != null || dateArray != undefined) {
                const day = dateArray[2].toString().padStart(2, '0');
                const month = dateArray[1].toString().padStart(2, '0');
                const year = dateArray[0].toString();

                const hours = dateArray[3].toString().padStart(2, '0');
                const minutes = dateArray[4].toString().padStart(2, '0');
                const seconds = dateArray[5].toString().padStart(2, '0');

                return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
            }
            return null;
        },
    },

}

</script>

<style scoped>

</style>