"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  createSnippet,
  getSnippets,
  deleteSnippet,
} from "@/services/snippetService";

import "@/styles/dashboard.css";

export default function SnippetsPage() {
  const [snippets, setSnippets] =
    useState([]);

  const [form, setForm] =
    useState({
      title: "",
      code: "",
      language:
        "javascript",
    });

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets =
    async () => {
      const data =
        await getSnippets();

      setSnippets(data);
    };

  const handleCreate =
    async () => {
      await createSnippet(
        form
      );

      setForm({
        title: "",
        code: "",
        language:
          "javascript",
      });

      fetchSnippets();
    };

  const handleDelete =
    async (id) => {
      await deleteSnippet(
        id
      );

      fetchSnippets();
    };

  return (
    <div className="snippets-page">
      <h1>
        Code Snippets
      </h1>

      <input
        placeholder="Snippet Title"
        value={form.title}
        onChange={(e) =>
          setForm({
            ...form,
            title:
              e.target
                .value,
          })
        }
      />

      <textarea
        placeholder="Code"
        value={form.code}
        onChange={(e) =>
          setForm({
            ...form,
            code:
              e.target
                .value,
          })
        }
      />

      <select
        value={
          form.language
        }
        onChange={(e) =>
          setForm({
            ...form,
            language:
              e.target
                .value,
          })
        }
      >
        <option>
          javascript
        </option>

        <option>
          python
        </option>

        <option>
          java
        </option>
      </select>

      <button
        onClick={
          handleCreate
        }
      >
        Save Snippet
      </button>

      <div className="snippet-list">
        {snippets.map(
          (
            snippet
          ) => (
            <div
              key={
                snippet._id
              }
              className="snippet-card"
            >
              <h3>
                {
                  snippet.title
                }
              </h3>

              <pre>
                {
                  snippet.code
                }
              </pre>

              <p>
                {
                  snippet.language
                }
              </p>

              <button
                onClick={() =>
                  handleDelete(
                    snippet._id
                  )
                }
              >
                Delete
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}