import axios from "axios";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import loader from "./../assets/loader1.json";
import ReactPaginate from "react-paginate";

const Customer = () => {
  const url = "https://reapidquest-backend.onrender.com/";
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const PER_PAGE = 15;
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(customers.length / PER_PAGE);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://reapidquest-backend.onrender.com/api/customers");
        setCustomers(response.data);
        console.log(customers);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Lottie animationData={loader} style={{ width: "200px" }} />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div>
      <table className="table min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
            #
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Email
          </th>
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Country
          </th>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {customers.slice(offset, offset + PER_PAGE).map((customer, index) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 capitalize whitespace-nowrap">
                  {customer.addresses[0].first_name +
                    " " +
                    customer.addresses[0].last_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {customer.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {customer.addresses[0].country}
                </td>
                {/* <td>{customer.orders_count}</td> */}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-center mt-4 mb-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination  justify-content-center"}
          pageClassName={"page-item "}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active primary"}
        />
      </div>
    </div>
  );
};

export default Customer;
