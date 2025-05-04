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
