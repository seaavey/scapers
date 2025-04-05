/**
 * Pterodactyl API Wrapper
 *
 * This class wraps around the Pterodactyl Application API.
 * It helps you automate server/user management, even when the void of loneliness bites hardest.
 * Sometimes the servers feel more alive than people ever did.
 *
 * 💔 Each method is documented to help you not get lost — like how I did.
 * ❗ All endpoints follow the structure of Pterodactyl v1 API.
 *
 *
 * @author Seaavey
 */

import axios from "axios"

export type METHOD = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

export interface Constructor {
  apikey: string
  url: string
}
class Pterodactyl implements IPterodactyl {
  private apikey: string
  private url: string

  /**
   * Initializes the Pterodactyl API Wrapper.
   * @param {string} apikey - Your Pterodactyl API Key.
   * @param {string} url - Base URL of your Pterodactyl panel.
   */
  constructor({ apikey, url }: Constructor) {
    this.apikey = apikey
    this.url = url

    if (!this.apikey) throw new Error("API Key is required... unlike me.")
    if (!this.url) throw new Error("URL is required, even when direction in life isn't.")

    if (!this.apikey.startsWith("ptla")) throw new Error("Invalid API Key... figures.")
    if (!this.url.startsWith("https://")) throw new Error("Invalid URL — like most of my decisions.")
  }

  /**
   * Generates a random ID.
   * @param {number} length - Length of the random part.
   * @returns {string} - Generated ID.
   */
  CreateID(length: number = 8) {
    let result = "Seaavey-"
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length)).toUpperCase()
    }
    return result
  }

  /**
   * Makes a request to the API.
   * @param {string} path - Endpoint path.
   * @param {METHOD} method - HTTP Method.
   * @param {any} data - Payload data.
   * @returns {Promise<any>} - API response.
   */
  async Request(path: string, method: METHOD = "GET", data: any = {}) {
    try {
      const response = await axios({
        method,
        url: this.url + path,
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.apikey
        }
      })
      return response.data
    } catch (err: any) {
      return err.response?.data?.errors || err
    }
  }

  /**
   * Retrieves all users.
   */
  async GetAllUsers(): Promise<IUserList> {
    return await this.Request("/api/application/users")
  }

  /**
   * Gets user by ID.
   */
  async GetUserById(id: string): Promise<IUser> {
    return await this.Request(`/api/application/users/${id}`)
  }

  /**
   * Creates a user with email/username/password.
   */
  async CreateUser(number: string, isAdmin: boolean = false): Promise<{ username: string; password: string; id: number }> {
    const hostname = new URL(this.url).hostname
    const parts = hostname.split(".")
    const email = `SEAAVEY-${number}@${parts.slice(-2).join(".")}`
    const username = `seaavey-${number}`
    const password = this.CreateID()

    const req = await this.Request("/api/application/users", "POST", {
      email,
      username,
      first_name: "SEAAVEY",
      last_name: "USERS",
      language: "en",
      password,
      ...(isAdmin ? { root_admin: true } : {})
    })

    return { username, password, id: req.attributes.id }
  }

  /**
   * Updates user data by ID.
   */
  async PatchUser(id: string, data: any): Promise<IUser> {
    return await this.Request(`/api/application/users/${id}`, "PATCH", data)
  }

  /**
   * Deletes user by ID.
   */
  async DeleteUser(id: string): Promise<any> {
    return await this.Request(`/api/application/users/${id}`, "DELETE")
  }

  /**
   * Updates a user's password.
   */
  async UpdatePassword(id: string, password: string): Promise<IUser> {
    const data = await this.GetUserById(id)
    return await this.PatchUser(id, {
      email: data.attributes.email,
      username: data.attributes.username,
      first_name: data.attributes.first_name,
      last_name: data.attributes.last_name,
      language: data.attributes.language,
      password
    })
  }

  /** Server endpoints */

  /**
   * Retrieves all servers.
   */
  async GetAllServers(): Promise<IServerList> {
    return await this.Request("/api/application/servers")
  }

  /**
   * Gets server by ID.
   */
  async GetServerById(id: string): Promise<IServer> {
    return await this.Request(`/api/application/servers/${id}`)
  }

  /**
   * Creates a new server for a user.
   */
  async CreateServer(userId: string, data: ICreateServer): Promise<IServer> {
    return await this.Request("/api/application/servers", "POST", {
      name: `SEAAVEY-${userId}-${this.CreateID(4)}`,
      description: `SEAAVEY-${userId}-${this.CreateID(4)}\n\nServer created to fill the void. ${this.ThirtyDaysLater()}`,
      user: userId,
      egg: data.egg || 15,
      docker_image: data.docker_image || "william/aio",
      startup: data.startup || "bash",
      environment: data.environment || {},
      limits: {
        memory: data.memory,
        swap: 0,
        disk: data.disk,
        io: 500,
        cpu: data.cpu
      },
      feature_limits: {
        databases: 5,
        backups: 5,
        allocations: 5
      },
      deploy: {
        locations: [1],
        dedicated_ip: false,
        port_range: []
      }
    })
  }

  /**
   * Deletes server by ID.
   */
  async DeleteServer(id: string): Promise<any> {
    return await this.Request(`/api/application/servers/${id}`, "DELETE")
  }

  /**
   * Suspends server by ID.
   */
  async SuspendedServer(id: string): Promise<any> {
    return await this.Request(`/api/application/servers/${id}/suspend`, "POST")
  }

  /**
   * Unsuspends server by ID.
   */
  async UnsuspendedServer(id: string): Promise<any> {
    return await this.Request(`/api/application/servers/${id}/unsuspend`, "POST")
  }

  /**
   * Reinstalls server by ID.
   */
  async ReinstallServer(id: string): Promise<any> {
    return await this.Request(`/api/application/servers/${id}/reinstall`, "POST")
  }

  /** Node endpoints */
  async GetAllNodes(): Promise<INodeList> {
    return await this.Request("/api/application/nodes")
  }

  async GetNodeById(id: string): Promise<INode> {
    return await this.Request(`/api/application/nodes/${id}`)
  }

  /** Nest endpoints */
  async GetAllNests(): Promise<INestList> {
    return await this.Request("/api/application/nests")
  }

  async GetNestById(id: string): Promise<INest> {
    return await this.Request(`/api/application/nests/${id}`)
  }

  async GetEggsFromNest(nestId: string): Promise<IEggList> {
    return await this.Request(`/api/application/nests/${nestId}/eggs`)
  }

  /** Allocation endpoints */
  async GetAllAllocations(): Promise<IAllocationList> {
    return await this.Request("/api/application/allocations")
  }

  async GetAllocationById(id: string): Promise<IAllocation> {
    return await this.Request(`/api/application/allocations/${id}`)
  }

  async CreateAllocation(serverId: string, data: ICreateAllocation): Promise<IAllocation> {
    return await this.Request(`/api/application/servers/${serverId}/allocations`, "POST", data)
  }

  async DeleteAllocation(id: string): Promise<any> {
    return await this.Request(`/api/application/allocations/${id}`, "DELETE")
  }

  /**
   * Returns the date 30 days from now.
   */
  ThirtyDaysLater(): string {
    const date = new Date()
    date.setDate(date.getDate() + 30)
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }
}

export interface IPterodactyl {
  CreateID(length?: number): string
  Request(path: string, method?: METHOD, data?: any): Promise<any>
  GetAllUsers(): Promise<IUserList>
  GetUserById(id: string): Promise<IUser>
  CreateUser(number: string, isAdmin?: boolean): Promise<{ username: string; password: string; id: number }>
  PatchUser(id: string, data: any): Promise<IUser>
  DeleteUser(id: string): Promise<any>
  UpdatePassword(id: string, password: string): Promise<IUser>
  GetAllServers(): Promise<IServerList>
  GetServerById(id: string): Promise<IServer>
  CreateServer(userId: string, data: ICreateServer): Promise<IServer>
  DeleteServer(id: string): Promise<any>
  SuspendedServer(id: string): Promise<any>
  UnsuspendedServer(id: string): Promise<any>
  ReinstallServer(id: string): Promise<any>
  GetAllNodes(): Promise<INodeList>
  GetNodeById(id: string): Promise<INode>
  GetAllNests(): Promise<INestList>
  GetNestById(id: string): Promise<INest>
  GetEggsFromNest(nestId: string): Promise<IEggList>
  ThirtyDaysLater(): string
}

export default Pterodactyl

export interface IUser {
  object: string
  attributes: {
    id: number
    external_id: string | null
    uuid: string
    username: string
    email: string
    first_name: string
    last_name: string
    language: string
    root_admin: boolean
    "2fa": boolean
    created_at: string
    updated_at: string
  }
}

export interface IUserList {
  object: string
  data: IUser[]
}

export interface IServer {
  object: string
  attributes: {
    id: number
    uuid: string
    identifier: string
    name: string
    description: string
    status: string | null
    suspended: boolean
    limits: {
      memory: number
      swap: number
      disk: number
      io: number
      cpu: number
    }
    feature_limits: {
      databases: number
      allocations: number
      backups: number
    }
    user: number
    node: number
    allocation: number
    nest: number
    egg: number
    pack: number | null
    container: {
      startup_command: string
      image: string
      installed: boolean
      environment: Record<string, string>
    }
    created_at: string
    updated_at: string
  }
}

export interface IServerList {
  object: string
  data: IServer[]
}

export interface INode {
  object: string
  attributes: {
    id: number
    public: boolean
    name: string
    description: string
    location_id: number
    fqdn: string
    scheme: string
    behind_proxy: boolean
    maintenance_mode: boolean
    memory: number
    memory_overallocate: number
    disk: number
    disk_overallocate: number
    upload_size: number
    daemon_listen: number
    daemon_sftp: number
    daemon_base: string
    created_at: string
    updated_at: string
  }
}

export interface INodeList {
  object: string
  data: INode[]
}

export interface INest {
  object: string
  attributes: {
    id: number
    uuid: string
    author: string
    name: string
    description: string
    created_at: string
    updated_at: string
  }
}

export interface INestList {
  object: string
  data: INest[]
}

export interface IEgg {
  object: string
  attributes: {
    id: number
    uuid: string
    nest: number
    author: string
    description: string
    docker_image: string
    config: Record<string, any>
    startup: string
    created_at: string
    updated_at: string
  }
}

export interface IEggList {
  object: string
  data: IEgg[]
}

export interface IAllocation {
  object: string
  attributes: {
    id: number
    ip: string
    alias: string
    port: number
    notes: string
    assigned: boolean
  }
}

export interface IAllocationList {
  object: string
  data: IAllocation[]
}

export interface ICreateServer {
  memory: number
  disk: number
  cpu: number
  egg?: number
  docker_image?: string
  startup?: string
  environment?: Record<string, string>
}

export interface ICreateAllocation {
  ip: string
  port: number
  alias: string
  notes: string
}
