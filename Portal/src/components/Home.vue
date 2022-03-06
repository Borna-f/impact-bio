<template>
  <v-container>
    <v-card>
      <v-card-title> Sentence </v-card-title>
      <v-card-text>
        <v-textarea
          name="input-7-1"
          label="Enter your sentence here"
          v-model="sentence"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="submit"> Submit </v-btn>
        <v-spacer></v-spacer>
        <v-progress-circular v-show="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-card-actions>
    </v-card>
    <v-card class="mt-5" v-show="result || error">
      <v-card-title> Result </v-card-title>
      <v-card-text>
        <div v-if="error">
          {{ error }}
        </div>
        <div v-else>
          <v-simple-table>
            <thead>
              <tr>
                <th class="text-left">Word</th>
                <th class="text-left">Frequency</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in result" :key="item.data">
                <td>{{ item.data }}</td>
                <td>{{ item.frequency }}</td>
              </tr>
            </tbody>
          </v-simple-table>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import SendRequest from "./SendRequest";
export default {
  name: "ClientHome",
  data: () => ({
    loading: false,
    sentence: "",
    error: "",
    result: undefined,
  }),
  methods: {
    async submit() {
      this.loading = true;
      try {
        const response = await SendRequest.ProcessSentence(this.sentence);
        this.result = response.data;
      } catch (err) {
        this.error = err.message;
      } finally{
        this.sentence = "";
        this.loading = false;
      }
      
    },
  },
};
</script>
