import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Spinner
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { FaBan, FaCheck, FaSearch } from "react-icons/fa";
import "./TableUserBan.css";

const TableUserBan = ({ columns, handleActivateDeactivate, renderState }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [render, setRender] = useState(renderState);
  let url = 'https://backend-mniu.onrender.com/management/user';
  const auth_token = localStorage.getItem("auth_token");
  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(url, {
        signal,
        headers: { auth_token },
      });
      let json = await res.json();
      if (json.error) {
        json = []
      }
      setIsLoading(false);
      return {
        items: json,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });
  const [page, setPage] = React.useState(1);

  const rowsPerPage = 10;

  const pages = Math.ceil(list.items.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return list.items.slice(start, end);
  }, [page, list.items]);

  const getIcon = (type) => {
    switch (type) {
      case "activar":
        return <FaBan />;
      case "desactivar":
        return <FaCheck />;
    }
  };
  const handleFilterStatus = (e) => {
    const { value } = e.target;
    // Definir los datos que deseas enviar en el cuerpo de la solicitud
    const params = {
      status: value,
    };
    // Convertir los parámetros en una cadena de consulta (query string)
    const queryParams = new URLSearchParams(params).toString();
    const updateUrl = `https://backend-mniu.onrender.com/management/user?${queryParams}`;
    url = updateUrl;
    list.reload();
  }
  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (value !== '') {
      // Definir los datos que deseas enviar en el cuerpo de la solicitud
      const params = {
        name: value,
      };
      // Convertir los parámetros en una cadena de consulta (query string)
      const queryParams = new URLSearchParams(params).toString();
      const updateUrl = `https://backend-mniu.onrender.com/management/user?${queryParams}`;
      url = updateUrl;
    }
    list.reload();
  }
  const pagination = (
    <div className="flex w-full justify-center">
      <Pagination
        isCompact
        showControls
        showShadow
        color="secondary"
        page={page}
        total={pages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );

  return (
    <div className="table-users-cont">
      <div className="filters-elements-cont">
        <span >
          <Input
            type="search"
            size="sm"
            label="Buscar"
            placeholder="Introduce un nombre..."
            labelPlacement="outside-left"
            onChange={handleSearchChange}
            startContent={
              <FaSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
          />
          <Select
            size="sm"
            label="Selecciona un estatus"
            labelPlacement="outside-left"
            placeholder="Estatus..."
            onChange={handleFilterStatus}
            className="max-w-xs"
          >
            <SelectItem key='true' value='true'>
              activo
            </SelectItem>
            <SelectItem key='false' value='false'>
              inactivo
            </SelectItem>
          </Select>
        </span>
      </div>
      <Table
        aria-label="Example table with dynamic content"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
        classNames={{
          wrapper: "min-h-[222px]",
          table: "min-h-[400px]",
        }}
        bottomContent={pagination}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key} allowsSorting>{column.label}</TableColumn>
          )}
        </TableHeader>
        {
          (items.length < 1)
            ? <TableBody
              loadingContent={"No hay resultados..."}
              isLoading={true}></TableBody>
            : <TableBody
              items={items}
              isLoading={isLoading}
              loadingContent={<Spinner label="Loading..." />}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell
                      className={columnKey === "actions" ? "actions-cont" : ""}
                    >
                      {columnKey === "actions" ? (
                        <>
                          <Button
                            size="sm"
                            className="action-buttons"
                            onClick={() =>
                              handleActivateDeactivate(
                                item.id,
                                item.isActive ? "activar" : "desactivar"
                              )
                            }
                          >
                            {getIcon(item.isActive ? "activar" : "desactivar")}
                          </Button>
                        </>
                      ) : columnKey === "isActive" ? (
                        <span
                          className={
                            item.isActive ? "active-cell" : "inactive-cell"
                          }
                        >
                          {item.isActive ? "Activo" : "Inactivo"}
                        </span>
                      ) : (
                        item[columnKey]
                      )}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
        }

      </Table>
    </div>
  );
};

export default TableUserBan;
