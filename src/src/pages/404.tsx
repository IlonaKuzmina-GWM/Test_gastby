import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import Button from "../components/Button"
import MainLayout from "../layouts/MainLayout"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main>
        <MainLayout>
            <div className="container error-page">
                <div className="wrapper">
                    <h1>404</h1>
                    <p>page not found</p>
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
