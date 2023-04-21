<template>
  <div>
    <v-row >
      <v-col cols="12" lg="12" xl="8">
        <div>
          <div>
            <div id="category">
              <h2 class="text-h4 font-weight-bold">ANIMAL</h2>

            </div>

            <v-divider class="my-4"></v-divider>

            <v-row>
              <v-col cols="12" md="6" lg="4" v-for="(item, index) in listPostByTag" :key="index">
                <v-hover
                  v-slot:default="{ hover }"
                  open-delay="50"
                  close-delay="50"
                >
                  <div>
                    <v-card
                      flat
                      :color="hover ? 'white' : 'transparent'"
                      :elevation="hover ? 12 : 0"
                      hover
                      to="/detail"
                    >
                      <v-img
                        src="https://cdn.pixabay.com/photo/2016/11/14/04/45/elephant-1822636_1280.jpg"
                        :aspect-ratio="16 / 9"
                        gradient="to top, rgba(25,32,72,.4), rgba(25,32,72,.0)"
                        height="200px"
                        class="elevation-2"
                        style="border-radius: 16px"
                      >
                      </v-img>

                      <v-card-text>
                        <div class="text-h5 font-weight-bold primary--text hidden-title">
                          {{ item.title }}
                        </div>

                        <div class="text-body-1 hidden-content pt-4">
                            {{ item.content }}
                        </div>

                        <div class="d-flex align-center pt-4">
                          <v-avatar color="accent" size="36">
                            <v-icon dark>mdi-feather</v-icon>
                          </v-avatar>

                          <div class="pl-2">{{ item.createdBy }} ·
                              {{ convertDate(item.createdDate) }}</div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </div>
                </v-hover>
              </v-col>

            </v-row>
              <div class="mt-5 mb-5">
                  <v-pagination :length="6" v-model="page"></v-pagination>
              </div>
          </div>
        </div>
      </v-col>

      <v-col>
        <div>
          <siderbar />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import {GET_LIST_POST_BY_TAG, NEWEST_POST} from "@/utils";

export default {
  name: "Category",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
    data() {
      return{
          listPostByTag: [],
          page: 1,

      }
    },
    created() {
        this.getListPostByTagId();
    },
    watch:{
        page() {
            this.getListPostByTagId(this.page)
            this.scrollToSection("category")
        },
    },
    methods:{
        async getListPostByTagId(page = 1) {
            try {
                const tagId = this.$route.params.id;
                const response = await axios.get(GET_LIST_POST_BY_TAG + tagId + "&page=" + page);
                this.listPostByTag = response.data;
                const createdDate = this.listPostByTag.createdDate;
                this.listPostByTag.createdDate = this.convertDate(createdDate)
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
        scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            section.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        }
    },
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
