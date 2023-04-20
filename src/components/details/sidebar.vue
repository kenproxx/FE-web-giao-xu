<template>
  <div>

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
