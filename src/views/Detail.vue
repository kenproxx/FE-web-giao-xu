<template>
    <div>
        <div class="text-center">
            <v-overlay :value="loading">
                <v-progress-circular indeterminate></v-progress-circular>
            </v-overlay>
        </div>
        <v-row>
            <v-col cols="12" lg="12" xl="8">
                <div>
                    <div>
                        <v-card flat color="transparent">
                            <v-img
                                    :src="postDetail.thumbnailImg"
                                    :aspect-ratio="16 / 9"
                                    gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                                    style="border-radius: 16px"
                            ></v-img>

                            <v-card-text>

                                <div class="text-h4 font-weight-bold primary--text pt-4">
                                    <h4>{{ postDetail.title }}</h4>
                                </div>


                                <div class="d-flex align-center justify-space-between">
                                    <div class="d-flex align-center">
                                        <v-avatar color="accent" size="36">
                                            <v-icon dark>mdi-feather</v-icon>
                                        </v-avatar>

                                        <div class="pl-2 text-body-1">{{ postDetail.createdBy }} ·
                                            {{ convertDate(postDetail.createdDate) }}
                                        </div>
                                    </div>


                                </div>

                                <v-divider class="my-4"></v-divider>

                                <div v-html="postDetail.content"/>


                                <div class="d-flex align-center justify-space-between mt-8">
                                    <div>
                                        <v-row>
                                            <v-col class="flex-shrink-0" cols="auto">
                                                <v-chip color="accent">#Animalis</v-chip>
                                            </v-col>

                                            <v-col class="flex-shrink-0" cols="auto">
                                                <v-chip color="accent">#Travel</v-chip>
                                            </v-col>

                                            <v-col class="flex-shrink-0" cols="auto">
                                                <v-chip color="accent">#Birds</v-chip>
                                            </v-col>
                                        </v-row>
                                    </div>

                                </div>

                                <v-divider class="my-8"></v-divider>

                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </v-col>

            <v-col>
                <div>
                    <siderbar/>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import axios from "axios";
import {FIND_BY_ID} from "@/utils";

export default {
    name: "Category",
    components: {
        siderbar: () => import("@/components/details/sidebar")
    },
    data() {
        return {
            postDetail: {},
            loading: false,

        }
    },
    created() {
        this.loading = true;
        this.findPostById(this.$route.params.id)
    },
    methods: {
        async findPostById(id) {
            try {
                const response = await axios.get(FIND_BY_ID + id);
                this.postDetail = response.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        convertDate(dateString) {
            let date = new Date(dateString);
            let formattedDate = date.toLocaleDateString('en-GB');
            let formattedTime = date.toLocaleTimeString('en-GB');
            return `${formattedDate} - ${formattedTime}`
        }
    }
};
</script>
