<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="https://cdn.tailwindcss.com"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<div class="container mx-auto mt-5">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">
        Students List
    </h1>
    <a href="/students/create" class="bg-blue-500 text-white px-4 py-2 rounded">Add New Student</a>
</div>
@if(session('success'))
<div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
    <span class="block sm:inline">{{ session('success') }}</span>
</div>
@endif

<table class="w-full border border-gray-300 mt-3">
    <thead>
        <tr class="bg-gray-200">
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Phone</th>
            <th class="border px-4 py-2">Actions</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($students as $student)
            <tr class="hover:bg-gray-100">
                <td class="border px-4 py-2">{{ $student->id }}</td>
                <td class="border px-4 py-2">{{ $student->name }}</td>
                <td class="border px-4 py-2">{{ $student->email }}</td>
                <td class="border px-4 py-2">{{ $student->phone }}</td>
                <td class="py-3 px-4">
                    <div class="flex space-x-2">
                        <a href="/students/{{ $student->id }}" class="text-blue-500 hover:text-blue-700">View</a>
                        <a href="/students/{{ $student->id }}/edit" class="text-yellow-500 hover:text-yellow-700">Edit</a>

                        <!-- Delete Form -->
                        <form action="/students/{{ $student->id }}" method="POST" class="inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="text-red-500 hover:text-red-700"
                                    onclick="return confirm('Are you sure you want to delete this student?')">
                                Delete
                            </button>
                        </form>
                    </div>
                </td>

            </tr>
        @endforeach
    </tbody>
</table>
</body>
</html>
