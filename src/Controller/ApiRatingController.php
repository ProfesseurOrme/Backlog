<?php

namespace App\Controller;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("{_locale}/api/ratings/", name="api_rating")
 */
class ApiRatingController extends AbstractApiController
{
	private $entityManager;

	public function __construct(
		SerializerInterface $serializer,
		EntityManagerInterface $entityManager
	)
	{
		parent::__construct($serializer);
		$this->entityManager = $entityManager;
	}


}