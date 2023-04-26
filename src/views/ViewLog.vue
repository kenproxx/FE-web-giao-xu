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
                :items-per-page="5"
                class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar
                        flat
                >
                    <v-toolbar-title>Danh sách bài viết</v-toolbar-title>
                </v-toolbar>
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
            listLog: [],

        }
    },
    created() {
        this.getAllLog();
    },
    computed: {},
    methods: {
        async getAllLog() {
            try {
                this.loading = true;
                const response = await apiGetAuthen(GET_LIST_LOG);
                response.data.map(e => {
                    e.createdDate = this.convertArrayDate2Date(e.createdDate)
                })
                this.listLog = response.data;
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