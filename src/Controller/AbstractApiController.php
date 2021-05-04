<?php


namespace App\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

abstract class AbstractApiController extends AbstractController
{
		public $apiKey = "";

		protected $statusCode = 200;

		protected $serializer;

		public function __construct(SerializerInterface $serializer)
		{
			$this->serializer = $serializer;
		}

		public function getStatutsCode() : int
		{
			return $this->statusCode;
		}

		public function setStatusCode($statusCode): ApiController
		{
			$this->statusCode = $statusCode;

			return $this;
		}

		public function serializeData($data) : string
		{
			return $this->serializer->serialize($data, "json");
		}

		public function deserializeData(string $data, string $classname)
		{
			return $this->serializer->deserialize($data, $classname, "json");
		}

		public function respond($data): Response
		{
			return new Response($this->serializeData($data),$this->getStatutsCode(), ["Content-Type" => "application/json", "Access-Control-Allow-Origin" => "*"]);
		}

		public function respondWithErrors($errors): Response
		{
			$data = [
				'code' => $this->getStatutsCode(),
				'error' => $errors
			];
			return $this->respond($data);
		}

		public function respondCreated($data): Response
		{
			return $this->setStatusCode(Response::HTTP_CREATED)->respond($data);
		}

		public function respondDeleted($data) : Response
		{
			return $this->setStatusCode(Response::HTTP_NO_CONTENT)->respond($data);
		}

		public function respondNotFound($data) : Response
		{
			return $this->setStatusCode(Response::HTTP_NOT_FOUND)->respondWithErrors($data);
		}
}