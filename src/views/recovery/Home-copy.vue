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
                  Great Travel Blogs From Around The World To Inspire You
                </h2>
              </v-col>
              <v-col class="d-flex align-center">
                <v-avatar class="elevation-4" color="accent">
                  <v-icon large>mdi-feather</v-icon>
                </v-avatar>

                <div class="text-h6 pl-2">Yan Lee · 22 July 2019</div>
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

          <div class="pt-16">
            <h2 class="text-h4 font-weight-bold">Tất cả</h2>

            <div>
              <v-row v-for="i in 6" :key="i" class="py-4">
                <v-col cols="12" md="4">
                  <v-card flat height="100%">
                    <v-img
                        :aspect-ratio="16 / 9"
                        height="100%"
                        src="https://cdn.pixabay.com/photo/2021/01/27/06/54/nova-scotia-duck-tolling-retriever-5953883_1280.jpg"
                    ></v-img>
                  </v-card>
                </v-col>

                <v-col>
                  <div>

                    <h3 class="text-h4 font-weight-bold pt-3">
                      Ut enim blandit volutpat maecenas volutpat blandit
                    </h3>

                    <p class="text-h6 font-weight-regular pt-3 text--secondary">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur. Excepteur
                      sint occaecat cupidatat non proident, sunt in culpa qui
                      officia deserunt mollit anim id est laborum.
                    </p>

                    <div class="d-flex align-center">
                      <v-avatar color="accent" size="36">
                        <v-icon dark>mdi-feather</v-icon>
                      </v-avatar>

                      <div class="pl-2">Yan Lee · 03 Jan 2019</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </div>
      </v-col>

      <v-col>
        <div class="pt-16">
          <siderbar/>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    siderbar: () => import("@/components/details/sidebar"),
  },
};
</script>
