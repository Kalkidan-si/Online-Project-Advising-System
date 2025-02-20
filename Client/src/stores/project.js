import { defineStore } from "pinia";
import router from "@/router";
export const useProjectStore = defineStore("projectStore", {
  state: () => {
    return {
      errors: {},
      project: null,
    };
  },
  actions: {


    /************************ Get All Project    **************** */
    async getProjectAll() {
      const res = await fetch('/api/coordinator/projects', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },
    /************************ Get Completed Project    **************** */

    async getProjectCompleted() {
      const res = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },
    /************************ Get Project Request   **************** */
    async getUnassignedProject() {
      const res = await fetch('/api/coordinator/project-requests', {
        method: 'GET',

        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },
    /************************ Get All Ongoing Projects   **************** */

    async getAllOngoingProjects() {
      const res = await fetch("/api/coordinator/ongoing-projects", {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      // console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    /********************* Register Project***********/

    async registerProject(projectData) {

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,

        },
        body: projectData, // FormData object
      });

      const data = await res.json();
      if (data.errors) {
        this.errors = data.errors;
      } else {
        this.project = data;
        router.push({ name: "Home" });
      }


    },
    /********************* Delete Project  ********************** */
    async deleteProject(projectId) {
      const res = await fetch(`/api/admin/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },


    /****************  Approve Project Register  ***************/
    async updateApprovalStatus(projectId, approved) {
      const res = await fetch(`/api/projects/${projectId}/approval-status`, {
        method: "PUT",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approved }),
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    async approveProject(projectId) {
      return this.updateApprovalStatus(projectId, true);
    },

    async declineProject(projectId) {
      return this.updateApprovalStatus(projectId, false);
    },

    /************************ Get Projects by Advisor   **************** */
    async getProjectsByAdvisor(advisorId) {
      const res = await fetch(`/api/projects/advisor/${advisorId}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    /**************** Get Approved projects by Advisor********** */
    async getApprovedProjectsByAdvisor(advisorId) {
      const res = await fetch(`/api/projects/advisor/${advisorId}/approved`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    /**************** Get Comments by Project ********** */
    async getCommentsByProject(projectId) {
      const res = await fetch(`/api/projects/${projectId}/comments`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },



    /****************  Approve Student Register  ***************/
    async assignAdvisor(projectId, formData) {
      const res = await fetch(`/api/assign-advisor/${projectId}`, {
        method: 'PUT',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),

      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    async notifyDeadline(projectId) {
      const res = await fetch(`/api/projects/${projectId}/notify-deadline`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },

    /**************** Add Comment to Project ********** */
    async addComment(projectId, content, userId) {
      const res = await fetch(`/api/projects/${projectId}/comments`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, user_id: userId }),
      });

      const data = res.status !== 204 ? await res.json() : {};
      console.log(data);

      if (data.errors) {
        this.errors = data.errors;
      } else {
        return data;
      }
    },
  },

});
