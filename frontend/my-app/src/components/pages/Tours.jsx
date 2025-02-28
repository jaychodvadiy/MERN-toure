import React, { useState, useEffect } from "react";
import CommonSection from "../../shared/CommonSection";
import "../../styles/tour.css";
import Tourcard from "../../shared/Tourcard";
import Newsletter from "../../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../../hooks/useFetch.js";
import { BASE_URL } from "../../utils/config.js";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tourCount, data, loading, error } = useFetch(`${BASE_URL}/v1/tours`);

  useEffect(() => {
    if (tourCount) {
      setPageCount(Math.ceil(tourCount / 8));
    }
    window.scrollTo(0, 0);
  }, [page, tourCount, data]);

  return (
    <>
      <CommonSection title="All Tours" />

      <section>
        <Container>
          <Row>{/* SearchBar Component (if needed) */}</Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5 text-danger">{error}</h4>}
          {!loading && !error && data?.length === 0 && (
            <h4 className="text-center pt-5">No tours found.</h4>
          )}

          {!loading && !error && data?.data?.length > 0 && (
            <Row>
              {data.data.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <Tourcard tour={tour} />
                </Col>
              ))}

              {/* Pagination */}
              {pageCount > 1 && (
                <Col lg="12">
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    {[...Array(pageCount).keys()].map((number) => (
                      <span
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? "active__page" : ""}
                      >
                        {number + 1}
                      </span>
                    ))}
                  </div>
                </Col>
              )}
            </Row>
          )}
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
