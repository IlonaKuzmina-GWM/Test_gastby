import { HeadFC, Link, PageProps } from "gatsby"
import * as React from "react"
import Button from "../components/Button"
import MainLayout from "../layouts/MainLayout"


const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main >
        <MainLayout>
            <div className="container error-page">
                <div className="wrapper">
                    <h1 className="fs-1 fw-bold">404</h1>
                    <p className="mb-5 fs-5 text-light text-capitalize">page not found</p>
                    <Link to="/">
                        <Button name={"Back to home page"} size={"medium"} type={"primary"} />
                    </Link>
                </div>
            </div>
        </MainLayout>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
