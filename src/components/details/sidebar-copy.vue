<template>
  <div>
    <div>
      <h3 class="text-h5 font-weight-medium pb-4">Các tin khác</h3>

      <v-divider></v-divider>

      <div>
        <v-row v-for="i in 5" :key="i" class="py-2">
          <v-col cols="12" md="6" lg="5">
            <v-card height="100%" flat>
              <v-img
                src="https://cdn.pixabay.com/photo/2021/01/22/16/55/camera-5940588_1280.jpg"
                :aspect-ratio="16 / 9"
                height="100%"
              ></v-img>
            </v-card>
          </v-col>

          <v-col>
            <div>

              <h3 class="text-h6 font-weight-bold primary--text py-3">
                What do | need to know to start learning JavaScript?
              </h3>

              <div class="d-flex align-center">
                <v-avatar color="accent" size="24">
                  <v-icon dark small>mdi-feather</v-icon>
                </v-avatar>

                <div class="pl-2">Yan Lee · 03 Jan 2019</div>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>

    <div class="pt-4">
      <h3 class="text-h5 font-weight-medium pb-4">Phân loại</h3>

      <v-divider></v-divider>

      <v-card color="accent" dark flat v-for="i in 5" :key="i" class="my-4">
        <v-card-text
          class="d-flex justify-space-between align-center white--text"
        >
          <h6 class="text-h6">Travel</h6>

          <div class="text-h6">47</div>
        </v-card-text>
      </v-card>
    </div>


  </div>
</template>
