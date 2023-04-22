<template>
    <v-card>
        <v-card-title>
            <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-row>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                    >
                        <v-text-field
                                v-model="editedItem.name"
                                label="Dessert name"
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                    >
                        <v-text-field
                                v-model="editedItem.calories"
                                label="Calories"
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                    >
                        <v-text-field
                                v-model="editedItem.fat"
                                label="Fat (g)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                    >
                        <v-text-field
                                v-model="editedItem.carbs"
                                label="Carbs (g)"
                        ></v-text-field>
                    </v-col>
                    <v-col
                            cols="12"
                            sm="6"
                            md="4"
                    >
                        <v-text-field
                                v-model="editedItem.protein"
                                label="Pro123tein (g)"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
            >
                Hủy
            </v-btn>
            <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "PostManager",
    data() {
        return{
            editedItem: {
                name: '',
                calories: 0,
                fat: 0,
                carbs: 0,
                protein: 0,
            },
        }
    },
    created() {
    },
    computed: {
        formTitle () {
            return this.editedIndex === -1 ? 'Tạo bài viết' : 'Sửa bài viết'
        },
    },
}
</script>

<style scoped>

</style>