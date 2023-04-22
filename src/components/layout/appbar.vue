<template>
    <div>
        <v-navigation-drawer
                v-if="!$vuetify.breakpoint.smAndUp"
                v-model="drawer"
                :clipped="$vuetify.breakpoint.lgAndUp"
                app
                color="primary"
                dark
        >
            <v-list color="primary" nav>
                <v-list-item
                        v-for="(item, i) in btnItems"
                        :key="i"
                        :href="item.href"
                        :target="item.target"
                        :to="item.to"
                        link
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                        v-for="(item, i) in barItems"
                        :key="i"
                        :href="item.href"
                        :target="item.target"
                        :to="item.to"
                        link
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                :clipped-left="$vuetify.breakpoint.lgAndUp"
                app
                color="white"
                elevate-on-scroll
                flat
        >
            <v-container :class="{ 'px-0': !$vuetify.breakpoint.smAndUp }">
                <v-row
                        :no-gutters="!$vuetify.breakpoint.smAndUp"
                        align="center"
                        justify="space-between"
                >
                    <v-col class="d-flex align-center">
                        <v-app-bar-nav-icon
                                v-if="!$vuetify.breakpoint.mdAndUp"
                                @click.stop="drawer = !drawer"
                        />
                        <v-toolbar-title
                                class="font-weight-bold text-h5 primary--text"
                                style="cursor: pointer"
                                @click="$router.push('/')"
                        >
                            <v-icon color="primary" large>mdi-feather</v-icon>
                            Giáo xứ
                            <span class="accent--text">Đại Từ</span>
                        </v-toolbar-title>
                    </v-col>

                    <v-col v-if="$vuetify.breakpoint.mdAndUp" cols="8">
                        <v-btn
                                v-for="(item, i) in barItems"
                                :key="i"
                                :to="item.to"
                                class="text-capitalize"
                                exact
                                exact-active-class="accent--text"
                                text
                        > {{ item.title }}
                        </v-btn>
                        <v-btn
                            v-if="!hiddenManager()"
                                to="/manager"
                                class="text-capitalize"
                                exact
                                exact-active-class="accent--text"
                                text
                        > Quản lý
                        </v-btn>
                    </v-col>


                </v-row>
            </v-container>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        hidden: true,
        barItems: [
            {
                title: "Trang chủ",
                to: "/",
            },
            {
                title: "Danh mục",
                to: "/category",
            },
            {
                title: "Chi tiết",
                to: "/detail",
            },
            {
                title: "Về Giáo xứ",
                to: "/authors",
            },
            {
                title: "Đăng nhập",
                to: "/login",
            },
        ],
    }),
    methods: {
        hiddenManager() {
            const token = sessionStorage.getItem('access_token');
            if (token) {
                this.hidden = false;
            }
            return this.hidden;
        },
    }
};
</script>
