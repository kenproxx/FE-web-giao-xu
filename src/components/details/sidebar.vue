<template>
    <div>

        <div class="pt-4">
            <h3 class="text-h5 font-weight-medium pb-4">Phân loại</h3>

            <v-divider></v-divider>

            <v-card color="accent" dark flat v-for="(item, index) in listTag" :key="index" class="my-4" :to="{ name: 'Category', params: { id: item[1] } }">
                <v-card-text
                        class="d-flex justify-space-between align-center white--text" style="cursor: pointer"
                >
                    <h6 class="text-h6">{{ item[0] }}</h6>

                    <div class="text-h6">{{ item[2] }}</div>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import {GET_LIST_TAG, GET_LIST_TAG_AND_COUNT} from "@/utils";

export default {
    name: "SideBar",
    data() {
        return {
            listTag: [],

        }
    },
    created() {
        this.getListTagAndCount();
    },
    methods: {
        async getListTagAndCount() {
            try {
                const response = await axios.get(GET_LIST_TAG_AND_COUNT);
                this.listTag = response.data;
                console.log(this.listTag)
            } catch (error) {
                console.log(error)
            }
        },
    },

}
</script>
