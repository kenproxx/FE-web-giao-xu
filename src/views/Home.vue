<template>
    <div>
        <div>
            <v-card to="detail">
                <v-img
                        :aspect-ratio="16 / 9"
                        dark
                        gradient="to top, rgba(25,32,72,.7), rgba(25,32,72,.0)"
                        height="500px"
                        src="https://images.pexels.com/photos/3244513/pexels-photo-3244513.jpeg"
                >
                    <v-card-text class="fill-height d-flex align-end">
                        <v-row class="flex-column">
                            <v-col>
                                <v-btn color="accent" to="category">Mới nhất</v-btn>
                            </v-col>
                            <v-col cols="12" lg="8" md="10" xl="7">
                                <h2 class="text-h3 py-3" style="line-height: 1.2">
                                    {{postNewest.title}}
                                </h2>
                            </v-col>
                            <v-col class="d-flex align-center">
                                <v-avatar class="elevation-4" color="accent">
                                    <v-icon large>mdi-feather</v-icon>
                                </v-avatar>

                                <div class="text-h6 pl-2">{{postNewest.createdBy}} · {{postNewest.createdDate}}</div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-img>
            </v-card>
        </div>

        <v-row>
            <v-col cols="12" lg="12" xl="8">
                <div>
                    <div class="pt-16">
                        <h2 class="text-h4 font-weight-bold pb-4">Nổi bật</h2>

                        <v-row>
                            <v-col v-for="i in 6" :key="i" cols="12" lg="4" md="6">
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
                                                to="/detail"
                                        >
                                            <v-img
                                                    :aspect-ratio="16 / 9"
                                                    class="elevation-2"
                                                    gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                                                    height="200px"
                                                    src="https://cdn.pixabay.com/photo/2020/12/23/14/41/forest-5855196_1280.jpg"
                                                    style="border-radius: 16px"
                                            >
                                            </v-img>

                                            <v-card-text>
                                                <div class="text-h5 font-weight-bold primary--text">
                                                    How to write an awesome blog post in 5 steps
                                                </div>

                                                <div class="text-body-1 py-4">
                                                    Ultrices sagittis orci a scelerisque. Massa placerat
                                                    duis ultricies lacus sed turpis
                                                </div>

                                                <div class="d-flex align-center">
                                                    <v-avatar color="accent" size="36">
                                                        <v-icon dark>mdi-feather</v-icon>
                                                    </v-avatar>

                                                    <div class="pl-2">Yan Lee · 22 July 2019</div>
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
                    <v-pagination :length="6"></v-pagination>
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
            postNewest:{},
            listPost: [],

        }
    },
    created() {
        this.getNewestPost()
        this.findAllPost()
    },
    methods: {
        async getNewestPost() {
            try {
                const response = await axios.get(NEWEST_POST);
                this.postNewest = response.data;
                const createdDate = this.postNewest.createdDate;
                this.postNewest.createdDate = this.convertDate(createdDate)
                console.log(this.postNewest)
            } catch (error) {
                console.error(error);
            }
        },
        convertDate(dateString) {
            let date = new Date(dateString);
            let formattedDate = date.toLocaleDateString('en-GB');
            let formattedTime = date.toLocaleTimeString('en-GB');
            return `${formattedDate} - ${formattedTime}`
        },
        async findAllPost() {
            try {
                const response = await axios.get(FIND_ALL);
                this.listPost = response.data;
                console.log(this.listPost)
            } catch (error) {
                console.error(error);
            }
        },
    }
};
</script>
