import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import { TagsTwoTone } from "@ant-design/icons";
import qs from "qs";
import "./main.css";
import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import Cancel from "../../Cancel/main";
import axios from "axios";
import { message } from "antd";

const Groupshow = () => {
    const [data, setData] = useState();
    const [detail, setDatail] = useState("");
    const [loading, setLoading] = useState(false);
    const [iscancel, setIscancel] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const Cancelbox = (e) => {
        setDatail(e);
        console.log(e);
        setIscancel(!iscancel);
    };
    const navigate = useNavigate();
    const OnclickName = (record) => {
        const groupId = record.id;
        localStorage.setItem("myGroupid", groupId);
        navigate("/Chartdata/Chart4");
    };
    const fetchData = () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        fetch(`http://39.98.41.126:31801/groups`, {
            headers: {
                Authorization: token,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res.data);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: 200,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(tableParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const handleDelete = (record) => {
        const name = record.groupName;
        const updatedData = data.filter((item) => item.id !== record.id);
        setData(updatedData);
        const disbandGroup = (groupName) => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token
            axios
                .delete("http://39.98.41.126:31801/groups", {
                    headers: {
                        Authorization: ` ${token}`, // 使用从本地存储中获取的 token，以 Bearer 认证方案传递
                        "Content-Type": "application/json",
                    },
                    data: {
                        groupName: groupName, // 要上传的群组信息
                    },
                })
                .then((response) => {
                    const { code, msg } = response.data;
                    if (code === 1) {
                        message.success(msg);
                    } else {
                        message.error("Failed: " + msg);
                    }
                })
                .catch((error) => {
                    message.error("Failed");
                    console.log("Failed", error);
                });
        };
        disbandGroup(name);
    };

    const columns = [
        {
            title: "Group Name",
            dataIndex: "groupName",
            render: (dataIndex, record) => (
                <li
                    onClick={() => OnclickName(record)}
                    className={style.onclickName}
                >
                    {dataIndex}
                </li>
            ),
        },
        {
            title: "Group Type",
            render: () => <span>Publice</span>,
        },
        {
            title: "Group Data Num",
            dataIndex: "resourceQuantity",
        },
        {
            title: "Group Dimension",
            dataIndex: "dimension",
        },
        {
            title: "Group Detail",
            dataIndex: "description",
            render: (e) => <TagsTwoTone onClick={() => Cancelbox(e)} />,
        },
        {
            title: "Group Operate",
            render: (e, record) => (
                <button
                    onClick={() => handleDelete(record)}
                    className={style.withdrawal}
                >
                    Quit
                </button>
            ),
        },
    ];

    return (
        <>
            <div className="Paging">
                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={{
                        ...tableParams.pagination,
                        position: ["bottomRight"],
                    }}
                    loading={loading}
                    onChange={handleTableChange}
                />
            </div>
            {iscancel && (
                <Cancel className={style.cancelContainer} value={detail} />
            )}
        </>
    );
};
export default Groupshow;
