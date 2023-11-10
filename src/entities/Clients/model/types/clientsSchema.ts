export interface DataWithCount {
  data: Client[],
  total: string
}

export interface Client {
id?: string;
name?: string;
email?: string;
notes?: string;
phone?: string;
avatarUrls?: string;
profession?: string;
createdAt?: string;
updatedAt?: string;
userId?: string;
telegram?: string
instagram?: string;
address?: string,
isFav?: boolean
}

export interface ClientsSchema {
isLoading: boolean;
data?: Client[];
error?: string;
total?: string
}
