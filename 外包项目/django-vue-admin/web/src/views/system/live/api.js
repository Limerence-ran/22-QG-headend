import { request, requestForFormData, downloadFile } from "@/api/service";
export const urlPrefix = "/api/live_eval/";

export function GetList(query) {
  return request({
    url: urlPrefix,
    method: "get",
    params: { ...query },
  });
}

export function AddObj(obj) {
  return requestForFormData({
    url: urlPrefix + "create_live/",
    method: "post",
    data: obj,
  });
}

export function UpdateObj(obj) {
  return request({
    url: urlPrefix + obj.id + "/",
    method: "put",
    data: obj,
  });
}

export function DelObj(id) {
  return request({
    url: urlPrefix + id + "/",
    method: "delete",
    data: { soft_delete: true },
  });
}

export function BatchDel(keys) {
  return request({
    url: urlPrefix + "multiple_delete/",
    method: "delete",
    data: { keys },
  });
}

/**
 * 导出
 * @param params
 */
export function exportData(params) {
  return downloadFile({
    url: urlPrefix + "export_data/",
    params: params,
    method: "get",
  });
}
