import {http} from "../";
import {GitHubListItem, ListRequestParams} from "../../definitions/list";

export async function get(params: ListRequestParams) {
    return await http.get<GitHubListItem[]>("events", params)
}
