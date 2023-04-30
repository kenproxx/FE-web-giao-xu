<template>

    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>

        <div>
            <v-card :to="{ name: 'Detail', params: { id: postNewest.id } }"
            >
                <v-img
                        :aspect-ratio="16 / 9"
                        dark
                        gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
                        height="500px"
                        :src="postNewest.thumbnailImg"
                >
                    <v-card-text class="fill-height d-flex align-end">
                        <v-row class="flex-column">
                            <v-col>
                                <v-btn color="accent">Mới nhất</v-btn>
                            </v-col>
                            <v-col cols="12" lg="8" md="10" xl="7">
                                <h2 class="text-h3 py-3" style="line-height: 1.2">
                                    {{ postNewest.title }}
                                </h2>
                            </v-col>
                            <v-col class="d-flex align-center">
                                <v-avatar class="elevation-4" color="accent">
                                    <v-icon large>mdi-feather</v-icon>
                                </v-avatar>

                                <div class="text-h6 pl-2">{{ postNewest.createdBy }} ·
                                    {{ postNewest.createdDate }}
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-img>
            </v-card>
        </div>

        <v-row id="hot-post">
            <v-col cols="12" lg="12" xl="8">
                <div>
                    <div class="pt-16">
                        <h2 class="text-h4 font-weight-bold pb-4">Nổi bật</h2>

                        <v-row>
                            <v-col v-for="(item, index) in listPost" :key="index" cols="12" lg="4" md="6">
                                <v-hover
                                        v-slot:default="{ hover }"
                                        close-delay="50"
                                        open-delay="50"
                                >
                                    <div>
                                        <v-card
                                                :color="hover ? 'white' : 'transparent'"
                                                :elevation="hover ? 12 : 0"
                                                flat
                                                hover
                                                :to="{ name: 'Detail', params: { id: item.id } }"
                                                height="520"
                                        >
                                            <v-img
                                                    :aspect-ratio="16 / 9"
                                                    class="elevation-2"
                                                    gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                                                    height="200px"
                                                    :src="item.thumbnail_img"
                                                    style="border-radius: 16px"
                                                    :cover="true"
                                            >
                                            </v-img>

                                            <v-card-text>
                                                <div class="text-h5 font-weight-bold primary--text hidden-title">
                                                    {{ item.title }}
                                                </div>

                                                <div class="text-body-1 hidden-content pt-4" v-html="item.content"/>

                                                <div class="d-flex align-center pt-4">
                                                    <v-avatar color="accent" size="36">
                                                        <v-icon dark>mdi-feather</v-icon>
                                                    </v-avatar>

                                                    <div class="pl-2">{{ item.created_by }} ·
                                                        {{ item.created_date }}
                                                    </div>
                                                </div>
                                            </v-card-text>
                                        </v-card>
                                    </div>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </div>

                </div>
                <div class="mt-5 mb-5">
                    <v-pagination :length="totalPage" v-model="page"></v-pagination>
                </div>

            </v-col>
            <v-col>
                <div class="pt-14">
                    <siderbar/>
                </div>
            </v-col>

        </v-row>

    </div>
</template>

<script>
import axios from "axios";
import {FIND_ALL, NEWEST_POST} from "@/utils";

export default {

    name: "Home",
    components: {
        siderbar: () => import("@/components/details/sidebar"),
    },
    data() {
        return {
            postNewest: {},
            listPost: [],
            page: 1,
            totalPage: 0,
            loading: false,


        }
    },
    created() {
        this.loading = true;
        this.getNewestPost()
        this.findAllPost()

    },
    watch: {
        page() {
            this.loading = true;
            this.findAllPost(this.page)
            this.scrollToSection("hot-post")
        },
    },
    methods: {
        async getNewestPost() {
            try {
                const response = await axios.get(NEWEST_POST);
                this.postNewest = response.data;
                const createdDate = this.postNewest.createdDate;
                this.postNewest.createdDate = this.convertArrayDate2Date(createdDate)
            } catch (error) {
                console.error(error);
            }
        },

        convertArrayDate2Date(dateArray) {
            if (dateArray != null || dateArray != undefined) {
                const day = dateArray[2].toString().padStart(2, '0');
                const month = dateArray[1].toString().padStart(2, '0');
                const year = dateArray[0].toString();
                return `${day}/${month}/${year}`;
            }
            return null;
        },
        async findAllPost(page = 1) {
            try {
                const response = await axios.get(FIND_ALL + "?page=" + page);
                this.listPost = response.data;
                this.totalPage = this.listPost[0].total_page;
                this.listPost.map(e => {
                    e.created_date = this.convertArrayDate2Date(e.created_date)
                })
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }

    }
};
</script>
<style>
.hidden-content {
    display: -webkit-box;
    -webkit-line-clamp: 5; /* Số dòng tối đa trước khi nội dung bị ẩn */
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.hidden-title {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Số dòng tối đa trước khi nội dung bị ẩn */
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>