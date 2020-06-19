<template>
  <b-table :items="users" :fields="fields" class="book-table"
           bordered>
    <template v-slot:cell(user_id)="row">
      {{ row.item.id }}
    </template>
    <template v-slot:cell(username)="row">
      {{ row.item.username }}
    </template>
    <template v-slot:cell(name)="row">
      {{ `${row.item.profile.firstName} ${row.item.profile.lastName}` }}
    </template>
    <template v-slot:cell(email)="row">
      {{ row.item.profile.email }}
    </template>
    <template v-slot:cell(state)="row">
      <span v-if="row.item.enabled">
        <b-icon icon="person-check" class="user-table__icon-button"/>
        enabled
      </span>
      <span v-else>
        <b-icon icon="person-dash" class="user-table__icon-button"/>
        disabled
      </span>
    </template>
    <template v-slot:cell(operation)="row">
      <div class="user-table__icon-wrapper">
        <span @click="handleSetUserEnabled(row.item)" class="user-table__set-user-enabled">
          {{ row.item.enabled ? 'Disable' : 'Enable' }}
        </span>
      </div>
    </template>
  </b-table>
</template>

<script>
  export default {
    name: 'UserTable',
    props: {
      users: Array,
    },
    data() {
      return {
        fields: [
          { key: 'user_id', label: 'User ID' },
          { key: 'username', label: 'Username' },
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'email' },
          { key: 'state', label: 'State' },
          { key: 'operation', label: 'Operation' },
        ],
      };
    },
    methods: {
      handleSetUserEnabled(user) {
        this.$emit('set-user-enabled', user);
      },
    },
  };
</script>

<style scoped>
  .user-table__icon-wrapper {
    text-align: center;
  }
  .user-table__icon-button {
    cursor: pointer;
  }
  .user-table__set-user-enabled {
    cursor: pointer;
    color: dodgerblue;
  }
</style>
